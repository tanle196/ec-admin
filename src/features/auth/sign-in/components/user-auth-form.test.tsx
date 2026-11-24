import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, type RenderResult } from 'vitest-browser-react'
import { type Locator, userEvent } from 'vitest/browser'
import { UserAuthForm } from './user-auth-form'

const FORM_MESSAGES = {
  emailEmpty: 'Please enter your email.',
  passwordEmpty: 'Please enter your password.',
  passwordShort: 'Password must be at least 7 characters long.',
} as const

const authActions = vi.hoisted(() => ({
  handleLogin: vi.fn(),
  isLoading: false,
}))

vi.mock('@/features/auth/hooks/useAuthActions', () => ({
  useAuthActions: () => authActions,
}))

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    Link: ({
      children,
      to,
      className,
      ...rest
    }: {
      children?: React.ReactNode
      to: string
      className?: string
    }) => (
      <a href={to} className={className} {...rest}>
        {children}
      </a>
    ),
  }
})

describe('UserAuthForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    authActions.isLoading = false
  })

  describe('Rendering without redirectTo', () => {
    let screen: RenderResult
    let emailInput: Locator
    let passwordInput: Locator
    let signInButton: Locator
    let forgotPasswordLink: Locator

    beforeEach(async () => {
      screen = await render(<UserAuthForm />)
      emailInput = screen.getByRole('textbox', { name: /^Email$/i })
      passwordInput = screen.getByLabelText(/^Password$/i)
      signInButton = screen.getByRole('button', { name: /^Sign in$/i })
      forgotPasswordLink = screen.getByText(/^Forgot password\?$/i)
    })

    it('renders fields, submit button, and forgot password link', async () => {
      await expect.element(emailInput).toBeInTheDocument()
      await expect.element(passwordInput).toBeInTheDocument()
      await expect.element(signInButton).toBeInTheDocument()
      await expect.element(forgotPasswordLink).toBeInTheDocument()
    })

    it('shows validation messages when submitting empty form', async () => {
      await userEvent.clear(emailInput)
      await userEvent.clear(passwordInput)
      await userEvent.click(signInButton)

      await expect
        .element(screen.getByText(FORM_MESSAGES.emailEmpty))
        .toBeInTheDocument()
      await expect
        .element(screen.getByText(FORM_MESSAGES.passwordEmpty))
        .toBeInTheDocument()
      expect(authActions.handleLogin).not.toHaveBeenCalled()
    })

    it('shows a validation message for a short password', async () => {
      await userEvent.fill(passwordInput, '123')
      await userEvent.click(signInButton)

      await expect
        .element(screen.getByText(FORM_MESSAGES.passwordShort))
        .toBeInTheDocument()
      expect(authActions.handleLogin).not.toHaveBeenCalled()
    })

    it('submits credentials without a redirect target', async () => {
      await userEvent.fill(emailInput, 'a@b.com')
      await userEvent.fill(passwordInput, '1234567')
      await userEvent.click(signInButton)

      await vi.waitFor(() =>
        expect(authActions.handleLogin).toHaveBeenCalledWith(
          { email: 'a@b.com', password: '1234567' },
          undefined
        )
      )
    })
  })

  it('passes redirectTo to handleLogin when provided', async () => {
    const { getByRole, getByLabelText } = await render(
      <UserAuthForm redirectTo='/settings' />
    )

    await userEvent.fill(getByRole('textbox', { name: /Email/i }), 'a@b.com')
    await userEvent.fill(getByLabelText('Password'), '1234567')
    await userEvent.click(getByRole('button', { name: /Sign in/i }))

    await vi.waitFor(() =>
      expect(authActions.handleLogin).toHaveBeenCalledWith(
        { email: 'a@b.com', password: '1234567' },
        '/settings'
      )
    )
  })

  it('disables the sign in button while loading', async () => {
    authActions.isLoading = true
    const { getByRole } = await render(<UserAuthForm />)

    await expect
      .element(getByRole('button', { name: /Sign in/i }))
      .toBeDisabled()
  })
})
