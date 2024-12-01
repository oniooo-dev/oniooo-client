import React from 'react'
import ChatInterface from '../melody/interface/ChatInterface';

const Chat = ({ openAuthModal }: { openAuthModal: () => void }) => {
    return (
        <div className="flex w-full h-full items-center justify-center">
            {
                <ChatInterface openAuthModal={openAuthModal} />
            }
        </div>
    )
}

export default Chat