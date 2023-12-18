"use client"

import React, { useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'

import Modal from './modal'
import useRentModal from '@/app/hooks/useRentModal'

import Heading from '../heading'
import { categories } from '../Navbar/categories'
import CategoryInput from '../inputs/category-input'
import CountrySelect from '../inputs/country-select'

import Counter from '../inputs/counter'
import ImageUpload from '../inputs/image-upload'
import Input from '../inputs/input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

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
    const [isLoading, setIsLoading] = useState(false)
    const rentModal = useRentModal()
    const router = useRouter()
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
    const imgSrc = watch('imageSrc')

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

    //i think of generics as passing arguments to a type? 
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        //everytime we click next we are clicking the onsubmit function
        //if we are not on the last step just keep moving forward

        setIsLoading(true);

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('listing created');
                router.refresh();
                reset();
                setSteps(STEPS.CATEGORY)
                rentModal.onClose()
            })
            .catch(err => {
                toast.error('Something went Wrong')
            })
            .finally(() => setIsLoading(false))
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
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Add a photo of your place'
                    subtitle='Show Guests what your place looks like!'
                />
                <ImageUpload
                    value={imgSrc}
                    onChange={value => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='How would you describe your place?'
                    subtitle='Short and sweet works best!'
                />
                <Input
                    id='title'
                    label='Title'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                <hr />
                <Input
                    id='description'
                    label='Description'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Now set your price.'
                    subtitle='How much do you charge per night?'
                />
                <Input
                    id='price'
                    label='Price'
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    errors={errors}
                    required
                    register={register}
                />
            </div>
        )
    }

    return (
        <Modal
            title='Airbnb your home'
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            // onSubmit={onNext}
            //all the button are on the common modal
            onSubmit={handleSubmit(onSubmit)}
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
