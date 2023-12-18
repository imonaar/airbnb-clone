"use server"

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import prisma from "../libs/prismadb";


export async function getSession() {
    return await getServerSession(authOptions)
    //retrieve the logged in session
    //this is set after you log in
    //authOption in this case exposes the method that use used to log in ?

    //In addition, getServerSession will correctly update the cookie expiry time and update the session content if 
    //callbacks.jwt or callbacks.session changed something.
}

export async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            return null
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString(),
        }
    } catch (error: any) {
        return null // do not throw any error because this is not an api call but a db communication
    }
}