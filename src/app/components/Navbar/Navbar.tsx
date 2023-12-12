"use client"

import Container from "../container"
import Logo from "./logo"
import Search from "./search"
import Usermenu from "./usermenu"

export default function Navbar() {
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
                        <Usermenu/>
                    </div>
                </Container>
            </div>
        </div>
    )
}
