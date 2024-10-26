import EpicBackground from '@/components/background/EpicBackground'
import MochiMenu from '@/components/mochis/MochiMenu'
import React from 'react'

const MochiPage = () => {
  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen bg-black bg-opacity-80 text-[#f2f2f2]">
      <EpicBackground />
      <div className="absolute top-8 left-8">
        <p className="text-2xl font-medium">Mochi Shop</p>
      </div>
      <MochiMenu />
    </div>
  )
}

export default MochiPage