import React from 'react'

const DiscordButton = () => {
    return (
        <div
            onClick={() => window.open("https://discord.gg/7KfWYMjd", "_blank")}
            className="p-3 rounded-full bg-white bg-opacity-20 opacity-50 hover:opacity-100 duration-500 cursor-pointer"
        >
            <img src="/icons/discord.png" className="w-[14px] object-contain" />
        </div>
    );
};

export default DiscordButton;