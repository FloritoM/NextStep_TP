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
        <form className="space-y-3">
            <div className="w-full">
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Ingrese contraseña"
                            required
                            minLength={6}
                        />
                    </div>
                </div>
                <div>
                    <Button className="cursor-pointer hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" buttonText={"Enviar"} />
                    <Button className="cursor-pointer hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" buttonText={"Resetear"} />
                </div>
            </div>
        </form>
    );
}