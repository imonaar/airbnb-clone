import { getCurrentUser } from "../actions/get-current-user"
import { getReservations } from "../actions/get-reservations"
import ClientOnly from "../components/client-only"
import EmptyState from "../components/empty-state"
import { ReservationsClient } from "./_components/reservations-client"

export default async function TripsPage() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title='Unauthorized' subtitle='Please Login' />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id })

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Reservations Found' subtitle='Looks like you havent any reservations on your properties.' />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
}