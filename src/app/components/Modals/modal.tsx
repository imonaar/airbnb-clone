"use client"

import { useState, useEffect, useCallback } from 'react'
import { IoMdClose } from 'react-icons/io'

import Button from '../button'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string
    body?: React.ReactElement
    footer?: React.ReactElement
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

export default function Modal({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel

}: ModalProps) {
    const [showModel, setShowModel] = useState(isOpen)

    useEffect(() => {
        setShowModel(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModel(false)
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit()
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen) return null; //This is the most crucial line in out modal. If isOpen is false we dont proceed,
    //we render null and thus nothing appears on the screen

    return (
        <>
            <div className='
                flex
                items-center
                justify-center
                inset-0
                z-50
                overflow-x-hidden
                overflow-y-auto
                fixed
                outline-none
                focus:outline-none
                bg-neutral-800/70
            '>
                <div className='
                    relative
                    w-full
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    my-6
                    mx-auto
                    h-full
                    lg:h-auto
                    md:h-auto
                '>
                    {/* content */}

                    <div className={`
                        translate
                        duration-300
                        h-full
                        ${showModel ? 'translate-y-0' : 'translate-y-full'}
                        ${showModel ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <div className='
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0
                            rounded-lg
                            shadow-lg
                            relative
                            bg-white
                            w-full
                            flex
                            flex-col
                            outline-none
                            focus:outline-none
                        '>
                            <div className='
                                flex
                                items-center
                                p-6
                                rounded-t
                                justify-center
                                relative
                                border-b-[1px]
                            '>
                                <button className='
                                    p-1
                                    border-0
                                    hover:opacity-70
                                    absolute
                                    left-9
                                    transition
                                '>
                                    <IoMdClose onClick={handleClose} />
                                </button>
                                <div className='text-lg font-semibold'>
                                    {title}
                                </div>
                            </div>
                            
                            {/* BODY */}
                            <div className='relative p-6 flex-auto'>
                                {body}
                            </div>

                            {/* footer */}
                            <div className='flex flex-col gap-2 p-6'>
                                <div className='
                                    flex
                                    flex-row
                                    items-center
                                    gap-4
                                    w-full
                                '>
                                    {secondaryAction ? <Button
                                        outline
                                        disabled={disabled}
                                        label={secondaryActionLabel}
                                        onClick={handleSecondaryAction}
                                    /> : null}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
