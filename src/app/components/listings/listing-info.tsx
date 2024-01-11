"use client"

import Avatar from "@/app/components/avatar";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons";
import ListingCategory from "@/app/components/listings/listing-category";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../map"), {
    ssr: false
})

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string
    } | undefined;
    locationValue: string
}

export default function ListingInfo({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}: ListingInfoProps) {
    const { getByValue } = useCountries()
    const cordinates = getByValue(locationValue)?.latlng
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} guests </div>
                    <div>{roomCount} roomss </div>
                    <div>{bathroomCount} bathrooms </div>
                </div>
            </div>
            <hr />

            {category && <ListingCategory icon={category.icon} label={category.label} description={category.description} />}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={cordinates} />
        </div>
    )
}
