"use client"

import React from 'react'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill, GiBarn } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'

import Container from '../container'
import CategoryBox from './category-box'
import { usePathname, useSearchParams } from 'next/navigation'


export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This Property is close to the beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This Property is close to windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This Property is modern'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This Property is in the countryside'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This Property has a pool'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This Property is located on an island'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This Property is close to a lake'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This Property has a skiing activity'
    },
    {
        label: 'Castle',
        icon: GiCastle,
        description: 'This Property is in a camp'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This Property has Camping activities'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This Property is located on the arctic'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This Property is located in a cave'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This Property is located in the desert'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This Property is located in a barn'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This Property is  luxurious'
    },
]


export default function Categories() {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()

    const isMainPage = pathname === '/'

    return (
        <Container>
            {isMainPage ?
                <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                    {
                        categories.map(item => (
                            <CategoryBox
                                key={item.label}
                                label={item.label}
                                icon={item.icon}
                                description={item.description}
                                selected={category === item.label}
                            />
                        ))
                    }
                </div> : null}
        </Container>
    )
}
