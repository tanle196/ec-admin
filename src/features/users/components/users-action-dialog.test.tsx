import { toast } from 'sonner'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, type RenderResult } from 'vitest-browser-react'
import { type UserEvent, userEvent } from 'vitest/browser'
import { type User } from '../data/schema'
import { UsersActionDialog } from './users-action-dialog'

const VALIDATION_MESSAGES = {
  firstName: 'First Name is required.',
  lastName: 'Last Name is required.',
  username: 'Username is required.',
  phoneNumber: 'Phone number is required.',
  email: 'Email is required.',
  role: 'Role is required.',
  password: 'Password is required.',
  passwordMismatch: "Passwords don't match.",
  passwordLength: 'Password must be at least 8 characters long.',
  passwordNumber: 'Password must contain at least one number.',
  passwordLowercase: 'Password must contain at least one lowercase letter.',
} as const

const ROLE = {
  id: 'role-superadmin',
  name: 'Superadmin',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
}

const MOCK_USER: User = {
  id: 'alex_uuid',
  email: 'alex@smith.com',
  fullName: 'Alex Smith',
  roles: [ROLE],
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-02-02'),
}

type AssignRolesOptions = { onSuccess?: () => void; onError?: () => void }

const mockAssignRoles = vi.fn(
  (_vars: { id: string; roleIds: string[] }, opts?: AssignRolesOptions) =>
    opts?.onSuccess?.()
)

vi.mock('../hooks', () => ({
  useAssignUserRoles: () => ({ mutate: mockAssignRoles, isPending: false }),
}))

vi.mock('@/features/roles/hooks', () => ({
  useRoles: () => ({ data: { data: [ROLE] } }),
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

describe('UsersActionDialog', () => {
  beforeEach(() => vi.clearAllMocks())

  describe('add user', () => {
    it('renders title and description', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} />
      )

      const title = getByRole('heading', {
        level: 2,
        name: /Add New User/i,
      })
      const description = getByText(
        /Create new user here. Click save when you're done./i
      )

      await expect.element(title).toBeInTheDocument()
      await expect.element(description).toBeInTheDocument()
    })

    it('shows validation messages when the form is submitted with empty fields', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} />
      )

      const submitButton = getByRole('button', { name: /Save Changes/i })
      await userEvent.click(submitButton)

      for (const message of [
        VALIDATION_MESSAGES.firstName,
        VALIDATION_MESSAGES.lastName,
        VALIDATION_MESSAGES.username,
        VALIDATION_MESSAGES.phoneNumber,
        VALIDATION_MESSAGES.email,
        VALIDATION_MESSAGES.role,
        VALIDATION_MESSAGES.password,
      ]) {
        await expect.element(getByText(message)).toBeInTheDocument()
      }
    })

    it('keeps confirm password disabled until password field is touched', async () => {
      const { getByRole } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} />
      )

      const password = getByRole('textbox', { name: /^Password$/i })
      const confirmPassword = getByRole('textbox', {
        name: /Confirm Password/i,
      })
      await expect.element(confirmPassword).toBeDisabled()

      await userEvent.type(password, 'a')
      await expect.element(confirmPassword).toBeEnabled()
    })

    it('shows password validation messages when password is invalid', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} />
      )

      const password = getByRole('textbox', { name: /^Password$/i })
      const confirmPassword = getByRole('textbox', {
        name: /Confirm Password/i,
      })
      await userEvent.type(password, 'a')
      await userEvent.type(confirmPassword, 'b')
      const submitButton = getByRole('button', { name: /Save Changes/i })

      await userEvent.click(submitButton)

      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordMismatch))
        .toBeInTheDocument()

      await userEvent.fill(password, 'short')
      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordLength))
        .toBeInTheDocument()

      await userEvent.fill(password, 'ONLYUPPERCASE')
      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordLowercase))
        .toBeInTheDocument()

      await userEvent.fill(password, 'onlylowercase')
      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordNumber))
        .toBeInTheDocument()

      await userEvent.fill(password, 'S3cur3P@ssw0rd')
      await userEvent.fill(confirmPassword, 'S3cur3P@ssw0rd')

      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordMismatch))
        .not.toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordLength))
        .not.toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordNumber))
        .not.toBeInTheDocument()
    })

    it('shows a not-implemented notice when a valid form is submitted', async () => {
      const onOpenChange = vi.fn()
      const screen = await render(
        <UsersActionDialog open onOpenChange={onOpenChange} />
      )

      await fillRequiredProfileFields(userEvent, screen)
      await fillPasswords(userEvent, screen, 'S3cur3P@ssw0rd', 'S3cur3P@ssw0rd')

      const submitButton = screen.getByRole('button', { name: /Save Changes/i })
      await userEvent.click(submitButton)

      await expect.poll(() => toast.info).toHaveBeenCalledOnce()
      expect(mockAssignRoles).not.toHaveBeenCalled()
      expect(onOpenChange).not.toHaveBeenCalled()
    })
  })

  describe('edit user', () => {
    it('renders title and description', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} currentRow={MOCK_USER} />
      )

      const title = getByRole('heading', {
        level: 2,
        name: /Edit User/i,
      })
      const description = getByText(
        /Update the user here\. Click save when you're done\./i
      )

      await expect.element(title).toBeInTheDocument()
      await expect.element(description).toBeInTheDocument()
    })

    it('prefills the form from the current user', async () => {
      const screen = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} currentRow={MOCK_USER} />
      )

      await expect
        .element(screen.getByLabelText(/first name/i))
        .toHaveValue('Alex')
      await expect
        .element(screen.getByLabelText(/last name/i))
        .toHaveValue('Smith')
      await expect
        .element(screen.getByLabelText(/^email$/i))
        .toHaveValue(MOCK_USER.email)
    })

    it('requires confirm password when password is changed', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} currentRow={MOCK_USER} />
      )

      const password = getByRole('textbox', { name: /^Password$/i })
      const confirmPassword = getByRole('textbox', {
        name: /Confirm Password/i,
      })

      await userEvent.fill(password, 'S3cur3P@ssw0rd')
      await expect.element(confirmPassword).toBeEnabled()

      const submitButton = getByRole('button', { name: /Save Changes/i })
      await userEvent.click(submitButton)

      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordMismatch))
        .toBeInTheDocument()
    })

    it('assigns the selected role and closes on success', async () => {
      const onOpenChange = vi.fn()
      const screen = await render(
        <UsersActionDialog
          open
          onOpenChange={onOpenChange}
          currentRow={MOCK_USER}
        />
      )

      await userEvent.fill(
        screen.getByLabelText(/phone number/i),
        '+19999999999'
      )

      const submitButton = screen.getByRole('button', { name: /Save Changes/i })
      await userEvent.click(submitButton)

      await expect.poll(() => mockAssignRoles).toHaveBeenCalledOnce()
      expect(mockAssignRoles).toHaveBeenCalledWith(
        { id: MOCK_USER.id, roleIds: [ROLE.id] },
        expect.any(Object)
      )
      expect(onOpenChange).toHaveBeenCalledWith(false)
      expect(toast.success).toHaveBeenCalledOnce()
    })
  })
})

async function fillRequiredProfileFields(
  user: UserEvent,
  screen: RenderResult
) {
  const entries = [
    [/first name/i, 'John'],
    [/last name/i, 'Doe'],
    [/username/i, 'john_doe'],
    [/^email$/i, 'a@b.co'],
    [/phone number/i, '+19999999999'],
  ] as const

  for (const [label, value] of entries) {
    const el = screen.getByLabelText(label)
    await expect.element(el).toBeInTheDocument()
    await user.fill(el, value)
  }

  const roleSelect = screen.getByRole('combobox', { name: /Role/i })
  await user.click(roleSelect)
  await user.click(screen.getByRole('option', { name: ROLE.name }))
}

async function fillPasswords(
  user: UserEvent,
  screen: RenderResult,
  a: string,
  b: string
) {
  const password = screen.getByLabelText(/^Password$/i)
  const confirmPassword = screen.getByLabelText(/^Confirm Password$/i)
  await user.fill(password, a)
  await user.fill(confirmPassword, b)
}
