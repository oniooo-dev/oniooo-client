import React from 'react'

interface SuggestionBannerProps {
    imgUrl: string
}

const SuggestionBanner: React.FC<SuggestionBannerProps> = ({ imgUrl }) => {
  return (
    <div className="relative w-full h-72 rounded-[15px] bg-white cursor-pointer">
        <img src={imgUrl} alt="suggestion-banner" className="w-full h-full object-cover rounded-[15px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent rounded-b-[15px]">
            <div className="absolute bottom-4 flex flex-row w-full items-center justify-between px-4">
                <div className="flex flex-row items-center justify-center gap-3">
                    <img src="https://i.pinimg.com/564x/a5/7e/76/a57e7679336d1ecc36397d9dfb9499dc.jpg" className="w-12 h-12 rounded-lg" />
                    <div className="flex flex-col">
                        <p className="text-base text-white">Fortnite</p>
                        <p className="text-xs text-white text-opacity-60">Epic Games</p>
                    </div>
                </div>
                <div className="px-5 py-1 cursor-pointer rounded-full bg-white bg-opacity-20 hover:bg-opacity-40">
                    <p className="text-sm text-white">Add</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SuggestionBanner