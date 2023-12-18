"use client"

import useCountries from "@/app/hooks/useCountries"
import Select from 'react-select'

export type CountrySelectValue = {
  value: string;
  label: string;
  latlng: number[];
  region: string;
  flag: string;
}

interface CountrySelectProps {
  val?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void
}


export default function CountrySelect({ val, onChange }: CountrySelectProps) {

  const { getAll } = useCountries();

  return (
    <div className="z-40">
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={val}
        onChange={(val) => onChange(val as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label}, 
              <span className="text-neutral-500  ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}
