import { getCurrentUser } from "../actions/get-current-user"
import { getFavouriteListings } from "../actions/get-favorite-listing"
import ClientOnly from "../components/client-only"
import EmptyState from "../components/empty-state"
import { FavoritesClient } from "./_components/favorites-client"

export default async function FavoritesPage() {
    const currentUser = await getCurrentUser()
    const favoriteListings = await getFavouriteListings()


    if (favoriteListings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Favorites Found' subtitle='Looks like you have no favorite listing.' />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient listings={favoriteListings} currentUser={currentUser} />
        </ClientOnly>
    )
}