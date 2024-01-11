import React from 'react'
import { getCurrentUser } from '../actions/get-current-user'
import ClientOnly from '../components/client-only'
import EmptyState from '../components/empty-state'
import { getReservations } from '../actions/get-reservations'
import {TripsClient} from './_components/trips-client'


export default async function TripsPage() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title='Unauthorized' subtitle='Please Login' />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({ userId: currentUser.id })

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Trips Found' subtitle='Looks like you havent reserved any trips.' />
            </ClientOnly>
        ) 
    }

    return (
        <ClientOnly>
            <TripsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
}
