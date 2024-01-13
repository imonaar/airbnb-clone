import prisma from '@/app/libs/prismadb'

export interface IListingParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(params: IListingParams) {

    const {
        userId,
        guestCount,
        roomCount,
        bathroomCount,
        startDate,
        endDate,
        locationValue,
        category,
    } = params

    let query: any = {

    }

    if (userId) {
        query.userId = userId
    }

    if (category) {
        query.category = category
    }

    if (guestCount) {
        query.guestCount = { gte: +guestCount }
    }

    if (roomCount) {
        query.roomCount = { gte: +roomCount }
    }

    if (bathroomCount) {
        query.bathroomCount = { gte: +bathroomCount }
    }

    if (locationValue) {
        query.locationValue = locationValue
    }

    if (startDate && endDate) {
        query.NOT = {
            reservations: {
                some: {
                    OR: [
                        {
                            startDate: { lte: startDate },
                            endDate: { gte: startDate },
                        },
                        {
                            startDate: { lte: endDate },
                            endDate: { gte: endDate },
                        }
                    ]
                }
            }
        }
    }

    try {
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings
    } catch (e: any) {
        console.log(e)
        throw new Error(e)
    }
}