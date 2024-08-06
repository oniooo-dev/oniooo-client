import React from 'react'

const ConversationBanner = () => {
  return (
    <div className="flex flex-row w-full p-1 gap-2 rounded-lg bg-gray-100 cursor-pointer 
                    duration-500 hover:scale-[1.05]
                    text-nowrap text-black">
      <p>History Item</p>
      <p>...</p>
    </div>
  )
}

export default ConversationBanner
