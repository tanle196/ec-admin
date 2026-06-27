import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Analytics } from './components/analytics'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { useDashboard } from './hooks/useDashboard'

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

function StatValue({ value, isLoading }: { value: string; isLoading: boolean }) {
  if (isLoading) return <Skeleton className='mt-1 h-7 w-28' />
  return <div className='text-2xl font-bold'>{value}</div>
}

function StatChange({ change }: { change: number | null }) {
  if (change === null) return <p className='text-xs text-muted-foreground'>All time</p>
  const sign = change >= 0 ? '+' : ''
  return (
    <p className='text-xs text-muted-foreground'>
      {sign}{change.toFixed(1)}% from last month
    </p>
  )
}

export function Dashboard() {
  const {
    recentOrders,
    totalOrders,
    pendingCount,
    totalRevenue,
    revenueChange,
    monthlyRevenue,
    totalUsers,
    isLoading,
  } = useDashboard()

  return (
    <>
      <Header>
        <TopNav links={topNav} className='me-auto' />
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports' disabled>Reports</TabsTrigger>
              <TabsTrigger value='notifications' disabled>Notifications</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            {/* Stats cards */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4 text-muted-foreground'>
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <StatValue value={formatVND(totalRevenue)} isLoading={isLoading} />
                  <StatChange change={revenueChange} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Orders</CardTitle>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4 text-muted-foreground'>
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <StatValue value={totalOrders.toLocaleString()} isLoading={isLoading} />
                  <p className='text-xs text-muted-foreground'>All time orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Pending Orders</CardTitle>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4 text-muted-foreground'>
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <StatValue value={pendingCount.toLocaleString()} isLoading={isLoading} />
                  <p className='text-xs text-muted-foreground'>Awaiting confirmation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='h-4 w-4 text-muted-foreground'>
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <StatValue value={totalUsers.toLocaleString()} isLoading={isLoading} />
                  <p className='text-xs text-muted-foreground'>Registered accounts</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Monthly revenue from delivered orders ({new Date().getFullYear()})
                  </CardDescription>
                </CardHeader>
                <CardContent className='ps-2'>
                  {isLoading ? (
                    <Skeleton className='h-87.5 w-full' />
                  ) : (
                    <Overview data={monthlyRevenue} />
                  )}
                </CardContent>
              </Card>

              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest 5 orders across all statuses.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales orders={recentOrders} isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-4'>
            <Analytics />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  { title: 'Overview', href: 'dashboard/overview', isActive: true, disabled: false },
  { title: 'Customers', href: 'dashboard/customers', isActive: false, disabled: true },
  { title: 'Products', href: 'dashboard/products', isActive: false, disabled: true },
  { title: 'Settings', href: 'dashboard/settings', isActive: false, disabled: true },
]
