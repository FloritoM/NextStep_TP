"use client";

import { Button } from "./button";
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function Login() {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/mainPage';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="h-full bg-[url('/login-background.png')] bg-cover flex justify-center items-center">
            <form action={formAction} className="rounded-xl border border-gray-700 box-border w-130 h-auto border-slate-400 inline-block bg-zinc-100 shadow-xl">
                <div className="w-120 m-auto">
                    <div className="mb-11">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-2xl text-black-900"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="block w-full border border-black-200 py-[9px] pl-3 text-sm placeholder:text-gray-500 rounded-sm"
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
                                className="mb-3 mt-5 block text-2xl text-black-900"
                                htmlFor="password"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    className="block w-full border border-black-200 py-[9px] pl-3 text-sm placeholder:text-gray-500 rounded-sm"
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
                    
                    <div className="flex items-center justify-center mb-11">
                        <input type="hidden" name="redirectTo" value={callbackUrl} />
                        <div>
                            <Button aria-disabled={isPending} className="cursor-pointer border-none bg-yellow-400 rounded-lg active:bg-blue-600 text-xl text-black font-semibold hover:bg-amber-600 flex flex-row" 
                            buttonText={"Iniciar sesión"} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center mb-11">
                            {errorMessage && (
                                <>
                                    <p className="text-xl text-red-500 font-semibold flex items-center justify-center mt-4">{errorMessage}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}