import { getCurrentUser } from '@/app/actions/get-current-user'
import { getListingById } from '@/app/actions/get-listing-by-id'
import ClientOnly from '@/app/components/client-only'
import EmptyState from '@/app/components/empty-state'
import ListingClient from './_components/listing-client'

interface Iparams {
  listingId: string
}

export default async function ListingPage({ params }: { params: Iparams }) {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient listing={listing} user={currentUser} />
    </ClientOnly>
  )
}
