"use client"

import { useState, useCallback } from 'react'
import { signOut } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'

import Avatar from '../avatar'
import MenuItem from './menuitem'
import { CurrentUserProps } from './Navbar'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'


export default function Usermenu({ currentUser }: CurrentUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen()

  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-default
          "
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            rounded-full
            cursor-pointer
            transition
            hover:shadow-md
            gap-3
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {
        isOpen ? <div className='
          absolute
          rounded-xl
          shadow-md
          w-[40vw]
          md:w-3/4
          bg-white
          overflow-hidden
          right-0
          top-16
          text-sm
        '>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ?
              <>
                <MenuItem onClick={() => router.push('/trips') } label="My Trips" />
                <MenuItem onClick={() => { }} label="My Favourites" />
                <MenuItem onClick={() => { }} label="My reservations" />
                <MenuItem onClick={() => { }} label="My properties" />
                <MenuItem onClick={() => { rentModal.onOpen() }} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Log Out" />

              </>
              :
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>}
          </div>
        </div> : null

      }
    </div>
  )
}
