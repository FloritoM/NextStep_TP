"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"
import { Fragment } from "react/jsx-runtime";

export default function NextStepIcon() {
    const router = useRouter();
    return (
        <Fragment>
            <Image
                src="/app-icon.png"
                width={90}
                height={26}
                alt="next step icon"
                loading="eager"
                onClick={() => router.push('/mainPage')}
                className="cursor-pointer" />
        </Fragment>
    );
}