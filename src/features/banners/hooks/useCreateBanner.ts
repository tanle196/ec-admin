import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateBannerDto } from '@/api/main'
import { bannerService } from '../api/bannerService'
import { bannerKeys } from '../queryKeys'

type CreateBannerInput = {
  body: Omit<CreateBannerDto, 'imageUrl'> & { imageUrl?: string }
  imageFile?: File | null
  imageMobileFile?: File | null
}

// The API requires an imageUrl on create, so a chosen desktop file is
// uploaded through the media endpoint first. The mobile image goes through
// the banner's own upload endpoint once the banner exists.
export const useCreateBanner = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      body,
      imageFile,
      imageMobileFile,
    }: CreateBannerInput) => {
      let { imageUrl, imagePublicId } = body
      if (imageFile) {
        const uploaded = await bannerService.uploadMedia({
          body: { file: imageFile },
        })
        imageUrl = uploaded.url
        imagePublicId = uploaded.publicId
      }
      if (!imageUrl) throw new Error('A desktop image is required.')

      const created = await bannerService.create({
        body: { ...body, imageUrl, imagePublicId },
      })

      if (imageMobileFile) {
        return bannerService.uploadImage({
          path: { id: created.id },
          body: { file: imageMobileFile, isMobile: true },
        })
      }
      return created
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all })
    },
  })
}
