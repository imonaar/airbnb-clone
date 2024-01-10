import prisma from '@/app/libs/prismadb'

export default async function getListings() {

    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return listings
    } catch (e: any) {
        console.log(e)
        throw new Error(e)
    }
}