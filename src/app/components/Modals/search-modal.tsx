"use client"

import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import CountrySelect, { CountrySelectValue } from "../inputs/country-select"
import qs from "query-string"
import { formatISO } from "date-fns"
import Heading from "../heading"
import Calendar from "../inputs/calendar"
import Counter from "../inputs/counter"

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const searchModal = useSearchModal()
    const router = useRouter()
    const params = useSearchParams()

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setSteps] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(0)
    const [roomCount, setRoomCount] = useState(0)
    const [bathroomCount, setBathroomCount] = useState(0)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    })

    const Map = useMemo(() => dynamic(() => import('../map'), {
        ssr: false
    }), [])

    const onBack = useCallback(() => {
        setSteps(value => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setSteps(value => value + 1)
    }, [])

    const onSubmit = useCallback(() => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        setSteps(STEPS.LOCATION)
        searchModal.onClose()

        router.push(url)
    }, [
        bathroomCount,
        dateRange,
        guestCount,
        location,
        params,
        roomCount,
        router,
        step,
        onNext,
        searchModal
    ])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }
        return 'Back'
    }, [step])


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go"
                subtitle="Find the perfect location"
            />

            <CountrySelect
                val={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}

            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {

        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go"
                    subtitle="Make sure everyone is free"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {

        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More Information"
                    subtitle="Find your perfect place"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }


    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        >

        </Modal>
    )
}

export { SearchModal }