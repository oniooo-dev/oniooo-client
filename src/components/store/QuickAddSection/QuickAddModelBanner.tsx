import React from 'react'

const QuickAddModelBanner = () => {
  return (
    <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-4">
            <div className="p-2 rounded-[15px] bg-white">
                <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" className="w-12 h-12" />
            </div>
            <div>
                <p className="font-medium">Gemini</p>
                <p className="text-sm text-white text-opacity-50">Anime-style drawings and video</p>
            </div>
        </div>
        <div className="mr-4 flex items-center justify-center px-5 py-1 rounded-3xl bg-white bg-opacity-15 hover:bg-opacity-30 cursor-pointer">
            <p className="text-sm">Add</p>
        </div>
    </div>
  )
}

export default QuickAddModelBanner