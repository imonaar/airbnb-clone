"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import Container from '@/app/components/container';
import Heading from '@/app/components/heading';
import ListingCard from '@/app/components/listings/listing-card';
import { SafeReservation, SafeUser } from '@/app/types';

interface ReservationClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

export function ReservationsClient({ reservations, currentUser }: ReservationClientProps) {

    const [deletingId, setDeletingId] = useState("")
    const router = useRouter()

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success("Reservation cancelled")
            router.refresh()
        }).catch((error: any) => {
            toast.error(error?.response?.data?.error)
        }).finally(() => {
            setDeletingId("")
        })
    }, [router])

    return (
        <Container>
            <Heading title="Reservations" subtitle="Where you have been and where you are going" />
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
                            actionLabel="Cancel Guest Reservation"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    )
}
