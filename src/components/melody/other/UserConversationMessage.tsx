import React from "react";

interface UserConversationMessageProps {
	senderName: string;
	content: string;
}

const UserConversationMessage: React.FC<UserConversationMessageProps> = ({ senderName, content }) => {
	return (
		<div className="flex flex-row gap-3 ml-auto w-[95%]">
			<div className="flex flex-col gap-[6px]">
				<div className="ml-auto">
					<p className="font-medium">{senderName}</p>
				</div>
				<div className="w-fit px-4 py-2 rounded-[10px] bg-white bg-opacity-15">
					<p>{content}</p>
				</div>
			</div>
		</div>
	);
};

export default UserConversationMessage;
