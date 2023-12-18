"use client"

import { useState, useCallback } from 'react';

import { signIn } from 'next-auth/react';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './modal';
import Heading from '../heading';
import Input from '../inputs/input';
import Button from '../button';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
    const router = useRouter()

    const registerModal = useRegisterModal();
    const loginMOdal = useLoginModal(); //this is what determines when the login modal is rendered

    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            email: "", password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        //This was set up in the pages/api/auth/[[...auth]].ts
        signIn('credentials', {
            ...data,
            redirect:false
        }).then((callback) => {
            setIsLoading(false)

            if (callback?.ok) {
                toast.success('Logged In');
                router.refresh()
                loginMOdal.onClose() //close the modal if all goes well
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    const toggle = useCallback(() => {
        loginMOdal.onClose();
        registerModal.onOpen();

    }, [loginMOdal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <Heading title='Welcome Back' subtitle='Log in to your Account' />
            <Input register={register} id='email' label='Email' disabled={isLoading} errors={errors} required />
            <Input register={register} id='password' label='Password' type='password' disabled={isLoading} errors={errors} required />
        </div>

    )

    const footerContent = (
        <div className={`
            flex flex-col gap-4 mt-3
        `}
        >
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => {signIn('google')}} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => {signIn('github') }} />
            <div className='text-neutral-500 text-center mt-4 font-light' >
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>
                        First time using Airbnb?
                    </div>
                    <div className='text-neutral-800 cursor-pointer hover:underline' onClick={toggle}>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginMOdal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginMOdal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
