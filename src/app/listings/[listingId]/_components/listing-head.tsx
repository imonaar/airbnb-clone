"use client"

import Heading from '@/app/components/heading';
import HeartButton from '@/app/components/listings/heart-button';
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import Image from 'next/image';
import React from 'react'

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    id: string;
    locationValue: string
    currentUser?: SafeUser | null;
}

export function ListingHead({ title, imageSrc, id, locationValue, currentUser }: ListingHeadProps) {
    const { getByValue } = useCountries()
    const location = getByValue(locationValue)


    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />

            <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <Image
                    alt="listing"
                    fill
                    src={imageSrc}
                    className='object-cover w-full '
                />
                <div className='absolute top-5 right-5 '>
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    )
}
