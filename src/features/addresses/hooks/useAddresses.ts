import { useQuery } from '@tanstack/react-query'
import { addressService } from '../api/addressService'
import { addressKeys } from '../queryKeys'

export const useAddresses = () => {
  return useQuery({
    queryKey: addressKeys.list(),
    queryFn: () => addressService.getList({}),
  })
}
