"use client"

import { useEffect } from 'react'
import EmptyState from './components/empty-state'

interface ErrorProps {
    error: Error
}

const ErrorState = ({ error }: ErrorProps) => {
    useEffect(() => {
        console.log(error)
    }, [error])

    return <EmptyState title='uh oh' subtitle='Something Went wrong' />
}

export default ErrorState