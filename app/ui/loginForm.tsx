"use client";

import { Button } from "./button";
import { SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter()

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
            router.push('/profile')
        } else {
            // Handle errors
        }
    }

    return (
        <form className="box-border w-150 m-auto border mt-50">
            <h1 className="text-3xl p-4 text-center">Bienvenido!</h1>
            <div className="w-120 m-auto">
                <div className="mb-5 ">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full border border-black-200 py-[9px] pl-10 text-sm placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Ingrese email"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full border border-black-200 py-[9px] pl-10 text-sm placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Ingrese contraseña"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-around mb-5">
                    <Button className="cursor-pointer hover:bg-indigo-300 border-solid border-1 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" buttonText={"Enviar"} />
                    <Button className="cursor-pointer hover:bg-indigo-300 border-solid border-1 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" buttonText={"Limpiar"} />
                </div>
            </div>
        </form>
    );
}