import React from 'react'

interface PromptSuggestionBannerProps {
    text: string;
}

const PromptSuggestionBanner: React.FC<PromptSuggestionBannerProps> = ({ text }) => {
    return (
        <div className="relative flex w-full px-4 py-3 gap-2 items-center rounded-2xl bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer duration-500">
            {/* Blended background */}
            <div className="absolute inset-0 bg-white bg-opacity-0 mix-blend-screen rounded-2xl" />

            <img src="https://winaero.com/blog/wp-content/uploads/2020/04/colorful-fluent-Paint-3D-icon-big.png" className="w-[14px] h-[14px]" alt="Paint" />
            <p>{text}</p>
        </div>
    )
}

export default PromptSuggestionBanner