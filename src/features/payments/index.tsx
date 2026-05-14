import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { PaymentsDialogs } from './components/payments-dialogs'
import { PaymentsProvider } from './components/payments-provider'
import { PaymentsTable } from './components/payments-table'

export function Payments() {
  return (
    <PaymentsProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Payments</h2>
          <p className='text-muted-foreground'>
            Manage and track all payment transactions.
          </p>
        </div>
        <PaymentsTable />
      </Main>

      <PaymentsDialogs />
    </PaymentsProvider>
  )
}
