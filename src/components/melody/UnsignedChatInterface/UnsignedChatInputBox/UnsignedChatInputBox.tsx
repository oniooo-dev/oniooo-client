import React from "react";
import FileUploadIcon from "./FileUploadIcon";
import FileUploadList from "./FileUploadList";
import SendButton from "./SendButton";
import VoiceButton from "./VoiceButton";

const UnsignedChatInputBox = () => {
	return (
		<div className="flex flex-row w-full gap-2">
			<div className="flex flex-col w-full px-4 rounded-[10px] bg-white bg-opacity-15">
				<div className="pt-2">
					<FileUploadList />
				</div>
				{/* Add the line div here */}
				<div className="line"></div>
				<div className="flex flex-row w-full gap-2">
					<div className="flex flex-row w-full items-center justify-center">
						<FileUploadIcon />
						<input
							type="text"
							placeholder="Message"
							className="w-full h-12 px-4 py-2 rounded-lg bg-transparent ring-0 focus:outline-none"
						/>
						<img
							src="/icons/melody/magic-card.png"
							className="w-5 h-5 cursor-pointer object-contain"
							alt="Enhance your prompt"
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-row mt-auto gap-2">
				<SendButton />
				<VoiceButton />
			</div>
		</div>
	);
};

export default UnsignedChatInputBox;
