"use client"

import { IconType } from 'react-icons'

interface ButtonProps {
    label?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean
    small?: boolean;
    outline?: boolean;
    icon?: IconType
}

export default function Button({
    label,
    onClick,
    disabled,
    small,
    outline,
    icon: Icon
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                w-full
                ${outline ? 'bg-white' : 'bg-rose-500'}
                ${outline ? 'border-black' : 'border-rose-500'}
                ${outline ? 'text-black' : 'text-white'}
                ${small ? 'py-1' : 'py-3'}
                ${small ? 'text-sm' : 'text-md'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
        `}>
            {Icon ? <Icon
                size={24}
                className='absolute left-4 top-3'
            /> : null}
            {label}
        </button>
    )
}
