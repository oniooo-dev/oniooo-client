import EpicBackground from '@/components/background/EpicBackground'
import MochiMenu from '@/components/ui/MochiMenu'
import React from 'react'

const MochiPage = () => {
  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen bg-black bg-opacity-80 text-[#f2f2f2]">
      <EpicBackground />
      {/* Page Title */}
      <div className="absolute top-8 left-8">
        <p className="text-2xl font-medium">Mochi Shop</p>
      </div>
      {/* Mochi Banners */}
      <MochiMenu />
      {/* <div className="flex-vertical gap-3 p-4 bg-white bg-opacity-60 rounded-xl">
        <div>Restaurant Menu</div>
        <div>Chow Man</div>
        <div>General Chicken</div>
        <div>Low Mein</div>
      </div> */}
    </div>
  )
}

export default MochiPage