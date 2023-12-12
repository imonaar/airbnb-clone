"use client"

import { useState, useCallback } from 'react'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../avatar'
import MenuItem from './menuitem'
import useRegisterModal from '@/app/hooks/useRegisterModal'

export default function Usermenu() {
  const [isOpen, setIsOpen] = useState(false)
  const registerModal = useRegisterModal()
  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => { }}
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
            <Avatar />
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
            <>
              <MenuItem onClick={() => { }} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
            </>
          </div>
        </div> : null

      }
    </div>
  )
}
