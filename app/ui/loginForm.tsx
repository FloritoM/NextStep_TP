"use client";

import { Button } from "./button";
import { useActionState } from 'react';
import { useState } from "react";
import { authenticate } from '@/app/lib/actions';
import { EyeIcon, EyeOffIcon } from '@/app/ui/passwordIcons'
import { useSearchParams } from 'next/navigation';
import { pacifico } from "./fonts";
import Link from "next/link";
import GoogleLoginButton from "./GoogleLoginButton";

export default function Login() {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[url('/login-background.png')] bg-cover flex justify-center items-center">
            <form action={formAction} className="rounded-xl border border-gray-700 box-border w-120 h-auto border-slate-400 inline-block bg-main shadow-xl overflow-hidden">
                <div className="w-100 m-auto flex flex-col">
                    <div className="flex justify-center mt-5">
                        <div className="flex">
                            <Link href="/">
                                <p className="text-center text-[3rem] text-white font-bold py-4 select-none">
                                    Next<span className={`${pacifico.className} italic text-amber-600 font-semibold select-none`}>Step</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <p className="text-[1.75rem] text-gray-50 font-bold text-center mb-3">
                            Inicio de sesión
                        </p>
                    </div>
                    <div className="mb-11">
                        <div>
                            <label className="mb-3 mt-5 block text-2xl text-gray-50" htmlFor="email">
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
                            <label className="mb-3 mt-5 block text-2xl text-gray-50" htmlFor="password">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    className="block bg-gray-50 w-full py-[9px] pl-3 pr-10 text-sm placeholder:text-gray-500 rounded-xl outline-none [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Ingrese contraseña"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                        <input type="hidden" name="redirectTo" value={callbackUrl} />
                        <div>
                            <Button
                                aria-disabled={isPending}
                                className="cursor-pointer border-none bg-yellow-400 rounded-lg active:bg-amber-700 text-xl text-black font-semibold hover:bg-amber-600 flex flex-row w-full"
                                buttonText={"Iniciar sesión"}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                        {errorMessage && (
                            <p className="text-m text-red-500 font-semibold">{errorMessage}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mx-4 mb-4">
                        <div className="flex-1 h-px bg-gray-600" />
                        <span className="text-gray-400 text-sm">o</span>
                        <div className="flex-1 h-px bg-gray-600" />
                    </div>
                    <div className="flex justify-center mb-4">
                        <GoogleLoginButton />
                    </div>
                    <div className="text-gray-400 text-sm pb-3 text-center">
                        ¿No tenes cuenta?{" "}
                        <Link href="/register" className="text-gray-50 font-semibold hover:underline">
                            Registrate acá
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center mt-1 mb-4 font-bold text-[1.3rem] text-amber-600 hover:text-yellow-400">
                    <Link href="/">← Volver</Link>
                </div>
            </form>
        </div>
    );
}