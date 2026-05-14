import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { OrdersDialogs } from './components/orders-dialogs'
import { OrdersProvider } from './components/orders-provider'
import { OrdersTable } from './components/orders-table'

export function Orders() {
  return (
    <OrdersProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Orders</h2>
          <p className='text-muted-foreground'>
            Manage and track all customer orders.
          </p>
        </div>
        <OrdersTable />
      </Main>

      <OrdersDialogs />
    </OrdersProvider>
  )
}
