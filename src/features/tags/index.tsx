import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TagsDialogs } from './components/tags-dialogs'
import { TagsPrimaryButtons } from './components/tags-primary-buttons'
import { TagsProvider } from './components/tags-provider'
import { TagsTable } from './components/tags-table'

export function Tags() {
  return (
    <TagsProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tags</h2>
            <p className='text-muted-foreground'>
              Manage product tags here.
            </p>
          </div>
          <TagsPrimaryButtons />
        </div>
        <TagsTable />
      </Main>

      <TagsDialogs />
    </TagsProvider>
  )
}
