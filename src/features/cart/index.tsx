import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CartDialogs } from './components/cart-dialogs'
import { CartProvider } from './components/cart-provider'
import { CartTable } from './components/cart-table'

export function Cart() {
  return (
    <CartProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Cart</h2>
          <p className='text-muted-foreground'>
            Manage cart items — add, update quantities, or remove items.
          </p>
        </div>
        <CartTable />
      </Main>

      <CartDialogs />
    </CartProvider>
  )
}
