import React from 'react'
import ChatHeader from './ChatHeader'
import ChatInputBox from './ChatInputBox'

const ChatInterface = () => {
  return (
    <div className="flex flex-col">
        <ChatHeader />
        <main>
            <p className="text-3xl font-semibold">ChatInterface</p>
        </main>
        <ChatInputBox />
    </div>
  )
}

export default ChatInterface