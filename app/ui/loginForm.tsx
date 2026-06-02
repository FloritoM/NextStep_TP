"use client";

import { Button } from "./button";
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

import Link from "next/link";
import NextStepIcon from "@/components/icon";

export default function Login() {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/home';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="h-full bg-[url('/login-background.png')] bg-cover flex justify-center items-center">
            <form action={formAction} className="rounded-xl border border-gray-700 box-border w-120 h-auto border-slate-400 inline-block bg-main shadow-xl overflow-hidden">
                <div className="w-100 m-auto flex flex-col">


                    <div className="flex justify-center mt-5">
                        <NextStepIcon />
                    </div>
                    <div className="">
                        <p className="text-[1.75rem] text-gray-50 font-bold text-center mb-6">
                            Inicio de sesión
                        </p>
                    </div>



                    <div className="mb-11">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-2xl text-gray-50"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="block bg-gray-50 w-full py-[9px] pl-3 text-sm placeholder:text-gray-500 rounded-xl outline-none"
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
                                className="mb-3 mt-5 block text-2xl text-gray-50"
                                htmlFor="password"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    className="block bg-gray-50 w-full py-[9px] pl-3 text-sm placeholder:text-gray-500 rounded-xl outline-none"
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
                            <Button aria-disabled={isPending} className="cursor-pointer border-none bg-yellow-400 rounded-lg active:bg-amber-700 text-xl text-black font-semibold hover:bg-amber-600 flex flex-row w-full"
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

                    <p className="text-gray-400 text-sm pb-3">
                        ¿No tienes cuenta?{" "}
                        <Link href="/register" className="text-gray-50 font-semibold hover:underline">
                            Regístrate aquí
                        </Link>
                    </p>

                </div>
            </form>
        </div>
    );
}