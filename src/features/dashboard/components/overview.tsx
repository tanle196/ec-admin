import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type MonthlyRevenue = { name: string; total: number }

const EMPTY_DATA: MonthlyRevenue[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
].map((name) => ({ name, total: 0 }))

const formatVND = (value: number) =>
  new Intl.NumberFormat('vi-VN', { notation: 'compact', style: 'currency', currency: 'VND' }).format(value)

interface OverviewProps {
  data?: MonthlyRevenue[]
}

export function Overview({ data = EMPTY_DATA }: OverviewProps) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          direction='ltr'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatVND}
          width={70}
        />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
          }
          cursor={{ fill: 'hsl(var(--muted))' }}
          contentStyle={{
            background: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            fontSize: '12px',
          }}
        />
        <Bar
          dataKey='total'
          name='Revenue'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
