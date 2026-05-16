import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DiscountsDialogs } from './components/discounts-dialogs'
import { DiscountsPrimaryButtons } from './components/discounts-primary-buttons'
import { DiscountsProvider } from './components/discounts-provider'
import { DiscountsTable } from './components/discounts-table'

export function Discounts() {
  return (
    <DiscountsProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Discounts</h2>
            <p className='text-muted-foreground'>
              Manage discount codes and promotions here.
            </p>
          </div>
          <DiscountsPrimaryButtons />
        </div>
        <DiscountsTable />
      </Main>

      <DiscountsDialogs />
    </DiscountsProvider>
  )
}
