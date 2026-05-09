import { Shield, UserCheck, Users, CreditCard } from 'lucide-react'

export const roleList = [
  {
    label: 'Superadmin',
    value: 'super-admin',
    icon: Shield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: UserCheck,
  },
  {
    label: 'Manager',
    value: 'member',
    icon: Users,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: CreditCard,
  },
] as const
