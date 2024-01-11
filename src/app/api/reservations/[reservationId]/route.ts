import { getCurrentUser } from "@/app/actions/get-current-user";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";



export async function DELETE(
    req: Request,
    { params }: {
        params: { reservationId: string }
    }
) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const { reservationId } = params

    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID")
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        },
    })

    return NextResponse.json(reservation)
}