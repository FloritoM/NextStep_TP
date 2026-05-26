"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"
import { Fragment } from "react/jsx-runtime";
import { pacifico } from "../app/ui/fonts";

export default function NextStepIcon() {
    const router = useRouter();
    return (
        <div className="flex pl-6">
            <p
                onClick={() => router.push('/mainPage')}
                className="text-center text-[2rem] text-black font-bold py-4 select-none">Next<span className={`${pacifico.className} italic text-amber-600 font-semibold select-none`}>Step</span>
            </p>
        </div>
    );
}