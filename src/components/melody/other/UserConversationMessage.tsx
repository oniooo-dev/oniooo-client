import React from "react";

interface UserConversationMessageProps {
	iconUrl: string;
	senderName: string;
	content: string;
}

const UserConversationMessage: React.FC<UserConversationMessageProps> = ({ iconUrl, senderName, content }) => {
	return (
		<div className="flex flex-row ml-auto gap-3">
			<div className="flex flex-col gap-2">
				<div className="ml-auto">
					<p className="font-medium">{senderName}</p>
				</div>
				<div className="w-fit px-4 py-2 rounded-[10px] bg-white bg-opacity-20">
					<p>{content}</p>
				</div>
			</div>
			<div className="mt-1 w-9 h-9 rounded-full bg-white">
				<img src={iconUrl} alt="icon" className="w-full h-full rounded-full" />
			</div>
		</div>
	);
};

export default UserConversationMessage;
