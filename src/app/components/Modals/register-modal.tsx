"use client"

import { useState, useCallback } from 'react';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './modal';
import Heading from '../heading';
import Input from '../inputs/input';
import Button from '../button';

export default function RegisterModal() {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    
    const { register, handleSubmit, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            name: "", email: "", password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch(() => {
                toast.error('Something Went Wrong')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <Heading title='Welcome to AirBnB' subtitle='Create an Account' />
            <Input register={register} id='email' label='Email' disabled={isLoading} errors={errors} required />
            <Input register={register} id='name' label='Name' disabled={isLoading} errors={errors} required />
            <Input register={register} id='password' label='Password' type='password' disabled={isLoading} errors={errors} required />
        </div>

    )

    const footerContent = (
        <div className={`
            flex flex-col gap-4 mt-3
        `}
        >
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => { }} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => { }} />
            <div className='text-neutral-500 text-center mt-4 font-light' >
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>
                        Already have an account?
                    </div>
                    <div className='text-neutral-800 cursor-pointer hover:underline' onClick={registerModal.onClose}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
