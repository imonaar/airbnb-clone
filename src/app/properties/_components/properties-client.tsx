"use client"

import Container from '@/app/components/container';
import Heading from '@/app/components/heading';
import ListingCard from '@/app/components/listings/listing-card';
import { SafeListing, SafeUser } from '@/app/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

interface TripsClientProps {
    listings: SafeListing[] ;
    currentUser: SafeUser | null;
}

export function PropertiesClient({ listings, currentUser }: TripsClientProps) {
    const [deletingId, setDeletingId] = useState("")
    const router = useRouter()

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`).then(() => {
            toast.success("Property Deleted")
            router.refresh()
        }).catch((error: any) => {
            toast.error(error?.response?.data?.error)
        }).finally(() => {
            setDeletingId("")
        })
    }, [router])

    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties"
            />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {
                    listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            onAction={onCancel}
                            disabled={deletingId === listing.id}
                            actionLabel="Delete Property"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    )
}
