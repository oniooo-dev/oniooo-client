import ProductSection from '@/components/store/ProductSection/ProductSection'
import QuickAddSection from '@/components/store/QuickAddSection/QuickAddSection'
import StoreHeaderBanner from '@/components/store/StoreHeaderBanner/StoreHeaderBanner'
import SuggestionSection from '@/components/store/SuggestionSection/SuggestionSection'
import React from 'react'

const StorePage = () => {
  return (
    <div className="flex flex-col w-full gap-16 px-[10vw] overflow-y-scroll">
      <div className="mt-[16vh]">
        <StoreHeaderBanner />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="w-full">
          <p className="text-4xl font-semibold">Quick Add</p>
        </div>
        <QuickAddSection />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <p className="text-6xl font-semibold">For you</p>
        <SuggestionSection />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <p className="text-6xl font-semibold">Stuff</p>
        <ProductSection />
      </div>
      <div className="h-[300px]"></div>
    </div>
  )
}

export default StorePage