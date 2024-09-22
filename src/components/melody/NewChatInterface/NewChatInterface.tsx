import React from 'react'
import NewChatTextArea from './NewChatTextArea';
import PromptSuggestionBanner from './PromptSuggestionBanner';

const NewChatInterface = () => {
    return (
        <div className="flex-vertical items-center justify-center w-full h-full">
            <div className="flex-vertical items-center justify-center w-[850px] h-[80px] gap-7">
                <div className="flex-horizontal items-center justify-center gap-[8px]">
                    <p className="text-[42px] font-medium text-white">
                        Everything in
                    </p>
                    <p className="text-[42px] font-medium bg-gradient-to-r from-red-400 via-pink-300 to-blue-300 text-transparent bg-clip-text">
                        Melody
                    </p>
                </div>
                <NewChatTextArea />
                <div className="grid grid-cols-2 gap-5 w-full text-[12px] font-[200] px-3 mb-20">
                    <PromptSuggestionBanner text="Some Prompt Some Prompt Some Prompt Some" />
                    <PromptSuggestionBanner text="Some Prompt Some Prompt Some Prompt Some" />
                    <PromptSuggestionBanner text="Some Prompt Some Prompt Some Prompt Some" />
                    <PromptSuggestionBanner text="Some Prompt Some Prompt Some Prompt Some" />
                </div>
            </div>
            <div className="absolute bottom-3 right-6">
                <p>Open Beta</p>
            </div>
        </div>
    )
}

export default NewChatInterface