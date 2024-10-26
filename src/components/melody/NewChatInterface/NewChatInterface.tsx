import React from 'react'
import NewChatTextArea from './NewChatTextArea';
import NewChatTitle from './NewChatTitle';

const NewChatInterface = () => {
    return (
        <div className="flex-vertical items-center justify-center w-full h-full">
            <div className="flex-vertical items-center justify-center w-[80%] h-[80px] gap-2">
                <NewChatTitle />
                <NewChatTextArea />
            </div>
            <div className="absolute bottom-4 right-4 text-opacity-50">
                <p className="text-[12px] text-[#d0dd3d8] font-[500]">Open Beta</p>
            </div>
        </div>
    )
}

export default NewChatInterface