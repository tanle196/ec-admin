import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ReviewsDialogs } from './components/reviews-dialogs'
import { ReviewsProvider } from './components/reviews-provider'
import { ReviewsTable } from './components/reviews-table'

export function Reviews() {
  return (
    <ReviewsProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Reviews</h2>
          <p className='text-muted-foreground'>
            Manage and moderate customer product reviews.
          </p>
        </div>
        <ReviewsTable />
      </Main>

      <ReviewsDialogs />
    </ReviewsProvider>
  )
}
