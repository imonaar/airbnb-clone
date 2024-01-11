import React from 'react'
import { IconType } from 'react-icons'

interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
}

export default function ListingCategory({ icon: Icon, label, description }: ListingCategoryProps) {
    return (
        <div className='flexx flexx-col gap-6'>
            <div className='flex flexx-row items-center gap-4'>
                <Icon size={40} className='text-neutal-600' />
                <div className='flex flex-col'>
                    <div className='text-lg font-semibold'>
                        {label}
                    </div>
                    <div className='text-neutral-500 font-light'>
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}
