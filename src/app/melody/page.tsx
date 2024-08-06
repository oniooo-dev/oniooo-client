import ChatInterface from '@/components/melody/ChatInterface/ChatInterface'
import SideExtensions from '@/components/melody/SideExtensions/SideExtensions'
import React from 'react'

const MelodyPage = () => {
  return (
    <div className="flex flex-row w-full h-full p-2">
      <ChatInterface />
      <SideExtensions />
    </div>
  )
}

export default MelodyPage