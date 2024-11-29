"use client"

import EpicBackground from '@/components/background/EpicBackground'
import BackButton from '@/components/layout/BackButton'
import MochiMenu from '@/components/mochis/MochiMenu'
import UserAccount from '@/components/shop/UserAccount'
import { AuthProvider } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const MochiPage = () => {

  const router = useRouter();

  return (
    <AuthProvider>
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 bg-black bg-opacity-80 text-[#f2f2f2]">
        <EpicBackground />
        <div className="absolute top-2 left-4">
          {/* <img
            src="/images/oniooo-logo.png"
            className="h-8 opacity-30 cursor-pointer"
            onClick={() => router.push('/melody')}
          /> */}
          <BackButton />
        </div>
        <div className="flex flex-col w-1/2">
          <UserAccount />
        </div>
        <div className="w-1/2 mt-8">
          <p className="text-2xl font-medium">
            Mochi Packs
          </p>
        </div>
        <MochiMenu />
      </div>
    </AuthProvider>
  )
}

export default MochiPage