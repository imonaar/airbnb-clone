"use client"

import Container from '@/app/components/container';
import Heading from '@/app/components/heading';
import ListingCard from '@/app/components/listings/listing-card';
import { SafeReservation, SafeUser } from '@/app/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser;
}

export function TripsClient({ reservations, currentUser }: TripsClientProps) {
    const [deletingId, setDeletingId] = useState("")
    const router = useRouter()

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success("reservation cancelled")
            router.refresh()
        }).catch((e: any) => {
            toast.error(e?.response?.data)
        }).finally(() => {
            setDeletingId("")
        })
    }, [router])

    return (
        <Container>
            <Heading title="Trips" subtitle="Where you have been and where you are going" />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {
                    reservations.map((reservation) => (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Deleting Reservation"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    )
}
