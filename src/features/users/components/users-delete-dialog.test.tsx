import { useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { type User } from '../data/schema'
import { UsersDeleteDialog } from './users-delete-dialog'

const mockDeleteUser = vi.fn()

vi.mock('../hooks', () => ({
  useDeleteUser: () => ({ mutate: mockDeleteUser, isPending: false }),
}))

const MOCK_USER: User = {
  id: 'user-delete-test',
  email: 'johndoe@shadcn-admin.com',
  fullName: 'John Doe',
  roles: [
    {
      id: 'role-manager',
      name: 'manager',
      createdAt: new Date('2026-01-01'),
      updatedAt: new Date('2026-01-01'),
    },
  ],
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-02-02'),
}

describe('UsersDeleteDialog', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders the dialog with the correct title, description, input and buttons', async () => {
    const { getByText, getByRole } = await render(
      <UsersDeleteDialog open onOpenChange={vi.fn()} currentRow={MOCK_USER} />
    )

    const title = getByRole('heading', {
      level: 2,
      name: /Delete User/i,
    })
    const desc = getByText(
      new RegExp(`Are you sure you want to delete ${MOCK_USER.fullName}?`, 'i')
    )
    const usernameInput = getByRole('textbox', { name: /Username/i })
    const cancelButton = getByRole('button', { name: /Cancel/i })
    const deleteButton = getByRole('button', { name: /Delete/i })

    await expect.element(title).toBeInTheDocument()
    await expect.element(desc).toBeInTheDocument()
    await expect.element(usernameInput).toBeInTheDocument()
    await expect.element(cancelButton).toBeInTheDocument()
    await expect.element(deleteButton).toBeInTheDocument()
    await expect.element(deleteButton).toBeDisabled()
  })

  it('keeps the delete button disabled until the full name is typed correctly', async () => {
    const { getByRole } = await render(
      <UsersDeleteDialog open onOpenChange={vi.fn()} currentRow={MOCK_USER} />
    )

    const usernameInput = getByRole('textbox', { name: /Username/i })
    const deleteButton = getByRole('button', { name: /Delete/i })

    await expect.element(deleteButton).toBeDisabled()

    await userEvent.fill(usernameInput, 'wrong-name')
    await expect.element(deleteButton).toBeDisabled()

    await userEvent.fill(usernameInput, MOCK_USER.fullName)
    await expect.element(deleteButton).toBeEnabled()
  })

  it('closes the dialog when the cancel button is clicked', async () => {
    const onOpenChange = vi.fn()
    const { getByRole } = await render(
      <UsersDeleteDialog
        open
        onOpenChange={onOpenChange}
        currentRow={MOCK_USER}
      />
    )

    const cancelButton = getByRole('button', { name: /Cancel/i })
    await userEvent.click(cancelButton)

    expect(onOpenChange).toHaveBeenCalledOnce()
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(mockDeleteUser).not.toHaveBeenCalled()
  })

  it('resets the input when the dialog is closed and reopened', async () => {
    function Harness() {
      const [open, setOpen] = useState(true)
      return (
        <>
          <button type='button' onClick={() => setOpen(true)}>
            Reopen
          </button>
          {open ? (
            <UsersDeleteDialog
              open={open}
              onOpenChange={setOpen}
              currentRow={MOCK_USER}
            />
          ) : null}
        </>
      )
    }

    const { getByRole } = await render(<Harness />)

    const usernameInput = getByRole('textbox', { name: /Username/i })
    await userEvent.fill(usernameInput, MOCK_USER.fullName)
    await expect.element(usernameInput).toHaveValue(MOCK_USER.fullName)

    const closeButton = getByRole('button', { name: /Cancel/i })
    await userEvent.click(closeButton)

    const reopenButton = getByRole('button', { name: /Reopen/i })
    await userEvent.click(reopenButton)
    await expect.element(usernameInput).toHaveValue('')
  })

  it('deletes the user when the delete button is clicked', async () => {
    const onOpenChange = vi.fn()
    const { getByRole } = await render(
      <UsersDeleteDialog
        open
        onOpenChange={onOpenChange}
        currentRow={MOCK_USER}
      />
    )

    const usernameInput = getByRole('textbox', { name: /Username/i })
    const deleteButton = getByRole('button', { name: /Delete/i })

    await userEvent.fill(usernameInput, MOCK_USER.fullName)
    await expect.element(deleteButton).toBeEnabled()

    await userEvent.click(deleteButton)

    expect(onOpenChange).toHaveBeenCalledOnce()
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(mockDeleteUser).toHaveBeenCalledOnce()
    expect(mockDeleteUser).toHaveBeenCalledWith(MOCK_USER.id)
  })

  it('deletes the user when pressing Enter in the input', async () => {
    const onOpenChange = vi.fn()
    const { getByRole } = await render(
      <UsersDeleteDialog
        open
        onOpenChange={onOpenChange}
        currentRow={MOCK_USER}
      />
    )

    const usernameInput = getByRole('textbox', { name: /Username/i })
    const deleteButton = getByRole('button', { name: /Delete/i })

    await userEvent.fill(usernameInput, MOCK_USER.fullName)
    await expect.element(deleteButton).toBeEnabled()

    await userEvent.keyboard('{Enter}')

    expect(onOpenChange).toHaveBeenCalledOnce()
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(mockDeleteUser).toHaveBeenCalledOnce()
    expect(mockDeleteUser).toHaveBeenCalledWith(MOCK_USER.id)
  })
})
