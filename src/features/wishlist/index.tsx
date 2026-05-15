import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { WishlistDialogs } from './components/wishlist-dialogs'
import { WishlistProvider } from './components/wishlist-provider'
import { WishlistTable } from './components/wishlist-table'

export function Wishlist() {
  return (
    <WishlistProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Wishlist</h2>
          <p className='text-muted-foreground'>
            Manage wishlist items — add or remove products.
          </p>
        </div>
        <WishlistTable />
      </Main>

      <WishlistDialogs />
    </WishlistProvider>
  )
}
