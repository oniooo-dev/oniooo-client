import React from 'react'

interface ConversationMessageProps {
    iconUrl: string;
    sender: string;
    senderName: string;
    content: string;
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({ sender, senderName, content }) => {
  return (
    <div className="flex flex-row gap-2">
        <div className="mt-2 w-10 h-10 rounded-full bg-white"></div>
        <div className="flex flex-col gap-2">
            <div>
                <p className="font-medium">{senderName}</p>
            </div>
            <div className="w-fit px-4 py-2 rounded-[10px] bg-white bg-opacity-20">
                <p>{content}</p>
            </div>
        </div>
    </div>
  )
}

export default ConversationMessage;