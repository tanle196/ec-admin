import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { AddressesDialogs } from './components/addresses-dialogs'
import { AddressesPrimaryButtons } from './components/addresses-primary-buttons'
import { AddressesProvider } from './components/addresses-provider'
import { AddressesTable } from './components/addresses-table'

export function Addresses() {
  return (
    <AddressesProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Addresses</h2>
            <p className='text-muted-foreground'>
              Manage your addresses here.
            </p>
          </div>
          <AddressesPrimaryButtons />
        </div>
        <AddressesTable />
      </Main>

      <AddressesDialogs />
    </AddressesProvider>
  )
}
