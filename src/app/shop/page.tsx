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
      <div className="w-screen h-screen bg-black bg-opacity-80 text-[#f2f2f2] overflow-scroll">

        {/* Background */}
        <EpicBackground />

        {/* Back Button */}
        <div className="absolute top-2 left-4">
          <BackButton />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center w-full h-full gap-6 overflow-scroll hide-scrollbar px-4">

          {/* User Account */}
          <div className="flex flex-col w-1/2 mt-36">
            <UserAccount />
          </div>

          {/* Mochi Packs */}
          <div className="flex flex-row w-1/2 gap-4 mt-4">
            <p className="text-2xl font-medium">Mochi Packs</p>
            <img src="/images/store/mochi_promotion_banner.png" alt="mochi promotion banner" className="w-[200px] h-auto" />
          </div>

          {/* Mochi Menu */}
          <MochiMenu />

          {/* Pricing (Mochis) */}
          <div className="w-1/2 mt-4">
            <p className="text-2xl font-medium">Pricing (Mochis)</p>
          </div>

          {/* Pricing (Generations) */}
          <div className="w-1/2">
            <GenerationPriceTable />
          </div>

          {/* Payment History */}
          {/* <div className="w-1/2 mt-16">
            <p className="text-2xl font-medium">Payment History</p>
          </div>
          <div className="w-full flex justify-center">
            <PaymentLogTable />
          </div> */}
          <div className="p-24"></div>
        </div>
      </div>
    </AuthProvider>
  )
}

export default MochiPage