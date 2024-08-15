import React from "react";

const ChatInputBox = () => {
	return (
		<div className="flex flex-row w-full gap-2">
			<div className="flex flex-row w-full items-center justify-center px-4 rounded-[10px] bg-white bg-opacity-20">					<div>
					<img 
						src={'https://cdn.icon-icons.com/icons2/2036/PNG/512/pin_clip_icon_124209.png'} 
						className="w-5 h-5 filter invert cursor-pointer" />
				</div>
				<input
					type="text"
					placeholder="Message"
					className="w-full h-12 px-4 py-2 rounded-lg bg-transparent ring-0 focus:outline-none"
				/>
			</div>
			<div className="flex w-12 h-12 items-center justify-center rounded-lg bg-white bg-opacity-20">
				<img 
					src={"https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png"}
					className="w-6 h-6 filter invert cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default ChatInputBox;
