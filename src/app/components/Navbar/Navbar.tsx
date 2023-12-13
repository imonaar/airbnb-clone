"use client"

import Container from "../container"
import Logo from "./logo"
import Search from "./search"
import Usermenu from "./usermenu"
import { SafeUser } from "@/app/types"
import Categories from "./categories"


export interface CurrentUserProps {
    currentUser?: SafeUser | null
}

export default function Navbar({ currentUser }: CurrentUserProps) {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="
          py-4 
          border-b-[1px]
          ">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <Usermenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}
