import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { RefundRequestsDialogs } from './components/refund-requests-dialogs'
import { RefundRequestsProvider } from './components/refund-requests-provider'
import { RefundRequestsTable } from './components/refund-requests-table'

export function RefundRequests() {
  return (
    <RefundRequestsProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Refund Requests</h2>
          <p className='text-muted-foreground'>
            Review and approve or reject customer refund requests.
          </p>
        </div>
        <RefundRequestsTable />
      </Main>

      <RefundRequestsDialogs />
    </RefundRequestsProvider>
  )
}
