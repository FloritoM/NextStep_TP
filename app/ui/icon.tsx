"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"
import { Fragment } from "react/jsx-runtime";

export default function NextStepIcon() {
    const router = useRouter();
    return (
        <Fragment>
            <p
                onClick={() => router.push('/mainPage')}
                className="cursor-pointer font-bold text-[40px] pt-2 pl-4 text-blue-400">
                NEXT STEP
            </p>
        </Fragment>
    );
}