import React from 'react'

const NewChatTextArea = () => {

    const handleSend = () => {
        console.log("Sent!");
    }

    return (
        <div className="relative flex items-center justify-center w-full h-[74px] p-3 rounded-full bg-white bg-opacity-10">
            {/* Blended background */}
            <div className="absolute inset-0 m-[10px] rounded-full bg-[#F1F0E7]" />

            {/* Content container */}
            <div className="relative flex items-center justify-center w-full h-full px-5 py-4 rounded-full">
                <div className="flex flex-row w-full items-center justify-center gap-3">
                    <img
                        src="/icons/melody/paperclip.png"
                        className="filter invert w-[20px] h-[20px] pb-[1px] cursor-pointer object-contain scale-x-[-1] rotate-45"
                        alt="Paperclip"
                    />
                    <input
                        type="text"
                        className="w-full h-full bg-transparent border-none ring-0 outline-none text-black placeholder-black/50"
                        placeholder="Try images, videos, music, literature, science, casual chats ..., casual chats ..., casual chats ..."
                    />
                </div>
            </div>
        </div>
    )
}

export default NewChatTextArea