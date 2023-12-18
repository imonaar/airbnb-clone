"use client"

import React, { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import Modal from './modal'
import useRentModal from '@/app/hooks/useRentModal'

import Heading from '../heading'
import { categories } from '../Navbar/categories'
import CategoryInput from '../inputs/category-input'
import CountrySelect from '../inputs/country-select'
import Map from '../map'
import dynamic from 'next/dynamic'


// rent model is goinng to have some ste›

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

export default function RentModal() {
    const rentModal = useRentModal()

    const [step, setSteps] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category')
    const location = watch('location')

    const MMap = useMemo(() => dynamic(() => import('../map'), {
        ssr: false
    }), [location])
    //watch the category value & use it to update the select state

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setSteps(value => value - 1)
    }

    const onNext = () => {
        setSteps(value => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Which of these best describes your place?'
                subtitle='Pick a Category'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {
                    categories.map(item => (
                        <div key={item.label} className='col-span-1'>
                            <CategoryInput
                                onClick={(category) => {
                                    setCustomValue('category', category)
                                }}
                                // this is coming from the onlick on category input i.e label of clicked item;
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title="Where's your place located?"
                    subtitle="Help Guests find you"
                />

                <CountrySelect
                    onChange={(location) => {
                        setCustomValue('location', location)
                    }}
                />
                {/* <Map center={location?.latlng} /> */}

            </div>
        )
    }

    return (
        <Modal
            title='Airbnb your home'
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}

        //we are feeding this into the modal to determine the its state;
        // the modal knows nothing about itself, it has to be controlled and given instructions;
        //it has np state of its own, everything is external;
        />
    )
}
