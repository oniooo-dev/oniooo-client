import React from 'react'

interface NewChatProps {
    onClick: (modelName: ModelName) => void;
}

const NewChat: React.FC<NewChatProps> = ({ onClick }) => {

    const handleClick = () => {
        onClick("gemini");
    }

    return (
        <button
            className="flex flex-row items-center px-5 py-2 gap-4 w-full h-[54px] bg-white bg-opacity-15 hover:bg-opacity-30 
                       rounded-[20px] duration-500 text-left font-medium"
            onClick={
                () => handleClick()
            }
        >
            <img src="/icons/melody/new-chat.png" className="w-[18px] h-[18px]" alt="Mochi" />
            <p>
                New Chat
            </p>
        </button>
    )
}

export default NewChat