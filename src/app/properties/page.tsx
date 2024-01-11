import { getCurrentUser } from '../actions/get-current-user'
import getListings from '../actions/get-listings'
import ClientOnly from '../components/client-only'
import EmptyState from '../components/empty-state'
import { PropertiesClient } from './_components/properties-client'


export default async function PropertiesPage() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title='Unauthorized' subtitle='Please Login' />
            </ClientOnly>
        )
    }

    const listings = await getListings({ userId: currentUser.id })

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Properties Found' subtitle='Looks like you dont have any properties listed.' />
            </ClientOnly>
        ) 
    }

    return (
        <ClientOnly>
            <PropertiesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    )
}
