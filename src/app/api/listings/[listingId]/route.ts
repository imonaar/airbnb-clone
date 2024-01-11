import { getCurrentUser } from '@/app/actions/get-current-user';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
    listingId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const listingId = params.listingId

    if (!listingId || typeof listingId !== "string") {
        throw new Error("invalid Id")
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            userId: currentUser.id,
            id: listingId
        }
    })

    return NextResponse.json(listing)
}