import prisma from "../libs/prismadb";

interface IParams {
    listingId?: string
}

const getListingById = async ({ listingId }: IParams) => {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            }, include: {
                user: true
            }
        })

        if (!listing) {
            return null
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            }
        }
    } catch (e: any) {
        throw new Error(e);
    }

}

export { getListingById }