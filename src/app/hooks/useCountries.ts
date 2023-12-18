import countries from 'world-countries'
import { create } from 'zustand'

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))

const useCountries = () => {
    const getAll = () => formattedCountries
    const getByValue = (value: string) => formattedCountries.filter(country => country.value === value)

    return {
        getAll,
        getByValue
    }
}

export default useCountries