import prisma from '@/app/libs/prismadb'

export interface IListingParams {
    userId?: string;
}

export default async function getListings(params: IListingParams) {

    const userId = params.userId

    let query: any = {

    }

    if (userId) {
        query.userId = userId
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