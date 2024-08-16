"use client";

import React, { useState } from 'react'
import QuickAddModelBanner from './QuickAddModelBanner'

const QuickAddSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="flex flex-col w-full gap-6">
        <div className="grid grid-cols-3 w-full gap-x-12 gap-y-6">
            <QuickAddModelBanner />
            <QuickAddModelBanner />
            <QuickAddModelBanner />
            <QuickAddModelBanner />
            <QuickAddModelBanner />
            <QuickAddModelBanner />
            <QuickAddModelBanner />
            <QuickAddModelBanner />
            <QuickAddModelBanner />
        </div>
        {isExpanded && (
            <div className="grid grid-cols-3 w-full gap-x-12 gap-y-6">
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
              <QuickAddModelBanner />
            </div>
        )}
        <div 
          className="flex w-full items-center justify-center py-2 rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img 
            src="https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png" 
            className={`w-4 h-4 filter invert duration-500 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
    </div>
  )
}

export default QuickAddSection