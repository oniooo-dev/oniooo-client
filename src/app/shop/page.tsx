"use client"

import React from 'react'
import EpicBackground from '@/components/background/EpicBackground'
import BackButton from '@/components/layout/BackButton'
import MochiMenu from '@/components/mochis/MochiMenu'
import GenerationPriceTable from '@/components/shop/GenerationPriceTable'
import UserAccount from '@/components/shop/UserAccount'
import { AuthProvider } from '@/contexts/AuthContext'
import PaymentLogTable from '@/components/shop/PaymentLogTable'

const MochiPage = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col w-screen h-screen gap-4 bg-black bg-opacity-80 text-[#f2f2f2]">
        <EpicBackground />
        <div className="absolute top-2 left-4">
          <BackButton />
        </div>
        <div className="flex flex-col items-center w-full h-full gap-4 overflow-scroll hide-scrollbar px-4">
          <div className="flex flex-col w-full md:w-1/2 mt-36">
            <UserAccount />
          </div>
          <div className="w-1/2 mt-8">
            <p className="text-2xl font-medium">Mochi Packs</p>
          </div>
          <MochiMenu />
          <div className="w-1/2 mt-16">
            <p className="text-2xl font-medium">Pricing (Mochies)</p>
          </div>
          <div className="w-full flex justify-center">
            <GenerationPriceTable />
          </div>
          <div className="w-1/2 mt-16">
            <p className="text-2xl font-medium">Payment History</p>
          </div>
          <div className="w-full flex justify-center">
            <PaymentLogTable />
          </div>
          <div className="p-24"></div>
        </div>
      </div>
    </AuthProvider>
  )
}

export default MochiPage