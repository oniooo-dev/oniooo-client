import React from "react";

const ChatInputBox = () => {
	return (
		<div>
			<input
				type="text"
				placeholder="Type a message"
				className="w-full h-12 p-2 border-2 border-gray-300 rounded-lg ring-0 focus:outline-none"
			/>
		</div>
	);
};

export default ChatInputBox;
