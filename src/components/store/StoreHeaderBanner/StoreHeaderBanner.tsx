"use client"

import React from 'react'
import { motion } from "framer-motion";

const StoreHeaderBanner = () => {
  return (
    <div className="relative flex items-center justify-center h-[25vw] max-w-full rounded-[15px]">
      <div className="absolute w-full h-full bg-cover bg-center transform scale-x-[-1] opacity-70 rounded-[15px]"
           style={{ backgroundImage: "url('/wallpapers/store/store-header-background.png')" }}></div>
      <img
        src="/wallpapers/store/store-header-idol.png"
        alt="Featured product"
        className="absolute bottom-0 left-0 w-[18vw] h-auto rounded-bl-[15px]"
      />
      <motion.div
        className="flex flex-col z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-9xl text-white font-semibold text-opacity-100">Store</p>
      </motion.div>
    </div>
  )
}

export default StoreHeaderBanner