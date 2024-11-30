"use client"

import EpicBackground from '@/components/background/EpicBackground'
import BackButton from '@/components/layout/BackButton'
import MochiMenu from '@/components/mochis/MochiMenu'
import GenerationPriceTable from '@/components/shop/GenerationPriceTable'
import PaymentLogs from '@/components/shop/PaymentLogs'
import UserAccount from '@/components/shop/UserAccount'
import { AuthProvider } from '@/contexts/AuthContext'
import React from 'react'

const MochiPage = () => {
  return (
    <AuthProvider>
      <div className="w-screen h-screen gap-4 bg-black bg-opacity-80 text-[#f2f2f2]">
        <EpicBackground />
        <div className="absolute top-2 left-4">
          <BackButton />
        </div>
        <div className="flex flex-col items-center w-full h-full gap-4 overflow-scroll hide-scrollbar">
          <div className="flex flex-col w-1/2 mt-36">
            <UserAccount />
          </div>
          <div className="w-1/2 mt-8">
            <p className="text-2xl font-medium">
              Mochi Packs
            </p>
          </div>
          <MochiMenu />
          <div className="w-1/2 mt-16">
            <p className="text-2xl font-medium">
              Pricing (Mochies)
            </p>
          </div>
          <GenerationPriceTable />
          <div className="w-1/2 mt-16">
            <p className="text-2xl font-medium">
              Payment History
            </p>
          </div>
          <div className="w-1/2 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
            <table className="w-full text-left border-collapse border-separate">
              <thead>
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">2024-01-01</td>
                  <td className="px-4 py-2">10</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">2024-01-02</td>
                  <td className="px-4 py-2">10</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-24"></div>
        </div>
      </div>
    </AuthProvider>
  )
}

export default MochiPage