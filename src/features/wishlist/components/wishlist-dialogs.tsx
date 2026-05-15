import { WishlistAddProductDialog } from './wishlist-add-product-dialog'
import { useWishlistContext } from './wishlist-provider'

export function WishlistDialogs() {
  const { open, setOpen } = useWishlistContext()

  return (
    <>
      <WishlistAddProductDialog
        open={open === 'add-product'}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null)
        }}
      />
    </>
  )
}
