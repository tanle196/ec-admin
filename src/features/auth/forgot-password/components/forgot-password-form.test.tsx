import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, type RenderResult } from 'vitest-browser-react'
import { userEvent, type Locator } from 'vitest/browser'
import { ForgotPasswordForm } from './forgot-password-form'

const forgotPasswordMock = vi.hoisted(() => vi.fn())

vi.mock('../../hooks/useForgotPassword', () => ({
  useForgotPassword: () => ({
    mutateAsync: forgotPasswordMock,
    isPending: false,
  }),
}))

describe('ForgotPasswordForm', () => {
  let screen: RenderResult
  let emailInput: Locator
  let continueButton: Locator

  beforeEach(async () => {
    vi.clearAllMocks()
    forgotPasswordMock.mockResolvedValue(undefined)

    screen = await render(<ForgotPasswordForm />)
    emailInput = screen.getByRole('textbox', { name: /^Email$/i })
    continueButton = screen.getByRole('button', { name: /^Continue$/i })
  })

  it('renders email field and continue button', async () => {
    await expect.element(emailInput).toBeInTheDocument()
    await expect.element(continueButton).toBeInTheDocument()
  })

  it('shows validation when submitting empty form', async () => {
    await userEvent.click(continueButton)
    await expect
      .element(screen.getByText(/^Please enter your email\.$/i))
      .toBeInTheDocument()
    expect(forgotPasswordMock).not.toHaveBeenCalled()
  })

  it('requests a reset link and shows the confirmation on success', async () => {
    await userEvent.fill(emailInput, 'a@b.com')
    await userEvent.click(continueButton)

    await vi.waitFor(() =>
      expect(forgotPasswordMock).toHaveBeenCalledWith({
        body: { email: 'a@b.com' },
      })
    )
    await expect
      .element(screen.getByText(/sent a password reset link/i))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('button', { name: /^Send again$/i }))
      .toBeInTheDocument()
  })

  it('keeps the form visible when the request fails', async () => {
    forgotPasswordMock.mockRejectedValue(new Error('boom'))

    await userEvent.fill(emailInput, 'a@b.com')
    await userEvent.click(continueButton)

    await vi.waitFor(() => expect(forgotPasswordMock).toHaveBeenCalledOnce())
    await expect.element(emailInput).toBeInTheDocument()
    await expect
      .element(screen.getByText(/sent a password reset link/i))
      .not.toBeInTheDocument()
  })
})
