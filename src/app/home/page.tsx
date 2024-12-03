"use client"

import BackButton from '@/components/layout/BackButton';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CompanyPage() {

    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen text-white">
            <img
                src="/backgrounds/claire-de-lune.png"
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ zIndex: -1 }}
            />
            <div className="flex flex-row items-center justify-between w-full h-16 px-10">
                <div>
                    <BackButton />
                </div>
                <div className="flex flex-row gap-8">
                    <p className="cursor-pointer underline underline-offset-8 duration-500">
                        Company
                    </p>
                    <p
                        className="cursor-pointer hover:underline underline-offset-8 duration-500"
                        onClick={() => {
                            window.location.href = '/terms-of-service';
                        }}
                    >
                        Terms of Service
                    </p>
                    <p
                        className="cursor-pointer hover:underline underline-offset-8 duration-500"
                        onClick={() => {
                            window.location.href = '/privacy-policy';
                        }}
                    >
                        Privacy Policy
                    </p>
                </div>
            </div>
            {/* The Actual Page */}
            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                <img
                    src="/images/company-header.png"
                    className="w-[50%] object-contain"
                    style={{ zIndex: -1 }}
                />
                <p className="text-2xl">
                    Bring ideas to life for all who dare to imagine.
                </p>
                <p className="text-2xl">
                    We build safe, versatile, and accelerated AI systems.
                </p>
                <button
                    className="px-8 py-4 rounded-[30px] bg-white bg-opacity-15 hover:bg-opacity-25 mt-4 duration-500"
                    onClick={() => router.push('/melody')}
                >
                    Launch Melody
                </button>
            </div>
        </div>
    )
}