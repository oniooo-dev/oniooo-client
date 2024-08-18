import React from "react";
import UnsignedChatHeader from "./UnsignedChatHeader";
import UnsignedChatInputBox from "./UnsignedChatInputBox/UnsignedChatInputBox";
import MessageList from "../other/MessageList";

const UnsignedChatInterface = () => {
	return (
		<div className="flex flex-col w-full h-full items-center">
			<div className="flex flex-col w-[60%] h-full">
				<UnsignedChatHeader />
				<MessageList />
				<div className="w-[100%] mb-9">
					<UnsignedChatInputBox />
				</div>
			</div>
		</div>
	);
};

export default UnsignedChatInterface;
