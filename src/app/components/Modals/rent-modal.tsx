"use client"

import React, { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'

import Modal from './modal'
import useRentModal from '@/app/hooks/useRentModal'

import Heading from '../heading'
import { categories } from '../Navbar/categories'
import CategoryInput from '../inputs/category-input'
import CountrySelect from '../inputs/country-select'

import Counter from '../inputs/counter'
import ImageUpload from '../inputs/image-upload'

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
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')

    const Map = useMemo(() => dynamic(() => import('../map'), {
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
                <Map center={location?.latlng} />

            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Share some basics about your place'
                    subtitle='What amenities do you have?'
                />
                <Counter
                    title='Guests'
                    subtitle='How many amenities do you have?'
                    value={guestCount}
                    onChange={value => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms do you have?'
                    value={roomCount}
                    onChange={value => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you have?'
                    value={bathroomCount}
                    onChange={value => setCustomValue('bathroomCount', value)}
                />
                <hr />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        <div className='flex flex-col gap-8'>
            <Heading
                title='Add a photo of your place'
                subtitle='Show Guests what your place looks like!'
            />
            <ImageUpload/>
        </div>
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
