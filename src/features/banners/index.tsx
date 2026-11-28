import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { BannersDialogs } from './components/banners-dialogs'
import { BannersPrimaryButtons } from './components/banners-primary-buttons'
import { BannersProvider } from './components/banners-provider'
import { BannersTable } from './components/banners-table'

export function Banners() {
  return (
    <BannersProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Banners</h2>
            <p className='text-muted-foreground'>
              Manage storefront banners, their placement and schedule.
            </p>
          </div>
          <BannersPrimaryButtons />
        </div>
        <BannersTable />
      </Main>

      <BannersDialogs />
    </BannersProvider>
  )
}
