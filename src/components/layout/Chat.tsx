import React from 'react'
import ChatInterface from '../melody/interface/ChatInterface';

const Chat = () => {
    return (
        <div className="flex w-full h-full items-center justify-center">
            {
                <ChatInterface />
            }
        </div>
    )
}

export default Chat