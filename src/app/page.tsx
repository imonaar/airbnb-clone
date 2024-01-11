import { getCurrentUser } from "./actions/get-current-user";
import getListings, { IListingParams } from "./actions/get-listings";
import ClientOnly from "./components/client-only";
import Container from "./components/container";
import EmptyState from "./components/empty-state";

import ListingCard from "./components/listings/listing-card";

interface HomeProps {
  searchParams: IListingParams
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()
  //this page should not throw ann error if there is not current signed in user because this page 
  //will be available to signed out users as well.

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {
            listings.map((listing: any) => (

              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing} />
            ))
          }
        </div>
      </Container>
    </ClientOnly>

  )
}
