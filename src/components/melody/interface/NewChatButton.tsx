import React from 'react'

interface NewChatButtonProps {
    onClick: () => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {

    const handleClick = () => {
        onClick();
    }

    return (
        <div
            className="flex flex-row justify-between items-center gap-2 px-4 py-4 bg-white bg-opacity-10 hover:opacity-60 rounded-2xl cursor-pointer duration-500"
            onClick={handleClick}
        >
            <p className="ml-1 text-[15px] font-normal">New Chat</p>
            <img src="/icons/melody/new-chat.png" className="w-[14px] h-[14px]" alt="New Chat" />
        </div>
    )
}

export default NewChatButton