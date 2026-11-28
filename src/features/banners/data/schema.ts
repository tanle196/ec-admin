import { type AdminBannerResponseDto } from '@/api/main'

export type Banner = AdminBannerResponseDto
export type BannerPosition = Banner['position']
export type BannerLinkType = Banner['linkType']

export const bannerPositions: { label: string; value: BannerPosition }[] = [
  { label: 'Hero', value: 'hero' },
  { label: 'Promo Strip', value: 'promo_strip' },
  { label: 'Mid Page', value: 'mid_page' },
  { label: 'Popup', value: 'popup' },
]

export const bannerLinkTypes: { label: string; value: BannerLinkType }[] = [
  { label: 'URL', value: 'url' },
  { label: 'Product', value: 'product' },
  { label: 'Category', value: 'category' },
  { label: 'Discount', value: 'discount' },
]

export const positionLabel = (value: BannerPosition) =>
  bannerPositions.find((p) => p.value === value)?.label ?? value

export const linkTypeLabel = (value: BannerLinkType) =>
  bannerLinkTypes.find((t) => t.value === value)?.label ?? value

// Nullable columns are typed as `object` by the generator but arrive as
// string | null over the wire.
export const asString = (v: unknown): string | null =>
  typeof v === 'string' && v !== '' ? v : null

export const asDate = (v: unknown): Date | null => {
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v
  if (typeof v === 'string' && v !== '') {
    const d = new Date(v)
    return isNaN(d.getTime()) ? null : d
  }
  return null
}

export type BannerStatus = 'active' | 'inactive' | 'scheduled' | 'expired'

export const getBannerStatus = (
  banner: Banner,
  now: Date = new Date()
): BannerStatus => {
  if (!banner.isActive) return 'inactive'
  const startsAt = asDate(banner.startsAt)
  const endsAt = asDate(banner.endsAt)
  if (startsAt && startsAt > now) return 'scheduled'
  if (endsAt && endsAt < now) return 'expired'
  return 'active'
}
