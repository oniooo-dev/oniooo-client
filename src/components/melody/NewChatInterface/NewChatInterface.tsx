import React from 'react'
import NewChatTextArea from './NewChatTextArea';
import PromptSuggestionBanner from './PromptSuggestionBanner';
import { PROMPT_SUGGESTIONS } from '@/lib/constants';

const NewChatInterface = () => {
    return (
        <div className="flex-vertical items-center justify-center w-full h-full">
            <div className="flex-vertical items-center justify-center w-[850px] h-[80px] gap-8">
                <div className="flex-horizontal items-center justify-center">
                    {/* <p className="text-[42px] font-medium text-white">
                        // Everything in
                    </p> */}
                    <p className="text-[42px] font-medium bg-gradient-to-r from-red-400 via-purple-400 via-pink-300 to-cyan-400 text-transparent bg-clip-text">
                        Everything in Melody
                    </p>
                </div>
                <NewChatTextArea />
                <div className="grid grid-cols-2 gap-5 w-full text-[12px] font-[200] px-1">
                    {PROMPT_SUGGESTIONS.map((suggestion, index) => (
                        <PromptSuggestionBanner key={index} text={suggestion} />
                    ))}
                </div>
            </div>
            <div className="absolute bottom-3 right-8 text-opacity-50">
                <p className="text-[12px] text-[#d0dd3d8] font-[500]">Open Beta</p>
            </div>
        </div>
    )
}

export default NewChatInterface