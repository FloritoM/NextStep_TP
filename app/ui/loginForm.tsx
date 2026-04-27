"use client";

import { Button } from "./button";
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function Login() {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="h-full bg-[url('/login-background.png')] bg-cover relative">
            <form action={formAction} className="box-border w-130 h-100 m-auto border inline-block mt-70 ml-160 bg-zinc-100 rounded-s shadow-xl">
                <h1 className="text-3xl p-4 text-center">Bienvenido!</h1>
                <div className="w-120 m-auto">
                    <div className="mb-13">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-2xl text-gray-900"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="block w-full border border-black-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
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
                                className="mb-3 mt-5 block text-2xl text-gray-900"
                                htmlFor="password"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    className="block w-full border border-black-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
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
                        <input type="hidden" name="redirectTo" value={callbackUrl} />
                        <Button aria-disabled={isPending} className="cursor-pointer hover:bg-indigo-300 border-solid border-1 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" buttonText={"Enviar"} />
                        <Button className="cursor-pointer hover:bg-indigo-300 border-solid border-1 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" buttonText={"Limpiar"} />
                        {errorMessage && (
                            <>
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            </>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}