import React from "react";

const ChatInputBox = () => {
	return (
		<div className="flex flex-row w-full gap-2">
			<div className="flex flex-row w-full items-center justify-center px-5 rounded-[10px] bg-white bg-opacity-15 hover:bg-opacity-30"><div>
					<img 
						src="/icons/melody/paperclip.png" 
						className="mt-[2px] w-5 h-5 cursor-pointer rotate-[38deg]" />
				</div>
				<input
					type="text"
					placeholder="Message"
					className="w-full h-12 px-4 py-2 rounded-lg bg-transparent ring-0 focus:outline-none"
				/>
			</div>
			<div className="flex w-12 h-12 items-center justify-center rounded-lg bg-white bg-opacity-15 hover:bg-opacity-30 cursor-pointer">
				<img 
					src="/icons/melody/microphone.png"
					className="w-6 h-6"
				/>
			</div>
		</div>
	);
};

export default ChatInputBox;
