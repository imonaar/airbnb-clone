"use client"

import Container from '@/app/components/container';
import Heading from '@/app/components/heading';
import ListingCard from '@/app/components/listings/listing-card';
import { SafeListing, SafeUser } from '@/app/types';

interface ReservationClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

export function FavoritesClient({ listings, currentUser }: ReservationClientProps) {
    return (
        <Container>
            <Heading title="Favorites" subtitle="List of places you have favorited" />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {
                    listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    )
}
