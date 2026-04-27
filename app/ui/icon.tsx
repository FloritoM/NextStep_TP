"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"

export default function NextStepIcon() {
    const router = useRouter();
    return (
        <>
            <Image
                src="/main_icon.png"
                width={90}
                height={20}
                alt="next step icon"
                loading="eager"
                onClick={() => router.push('/mainPage')}
                className="cursor-pointer" />
        </>
    );
}