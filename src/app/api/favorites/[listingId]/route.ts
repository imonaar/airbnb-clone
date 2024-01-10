import { getCurrentUser } from "@/app/actions/get-current-user"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

interface IParams {
    params: { listingId?: string }
}

export async function POST(req: Request, { params }: IParams) {
    console.log("here")
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    console.log(params)

    const listingId = params.listingId;

    if (!listingId ||typeof listingId !== "string") {
        throw new Error('Invalid Id')
    }

    let favouritesIds = [...(currentUser.favoriteIds) || []]
    favouritesIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favouritesIds
        }
    })
    return NextResponse.json(user)
}
export async function DELETE(req: Request, { params }: IParams) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const  listingId  = params.listingId;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}