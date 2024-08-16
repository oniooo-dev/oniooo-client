import React from "react";

interface OtherConversationMessageProps {
	iconUrl: string;
	senderName: string;
	content: string;
}

const OtherConversationMessage: React.FC<OtherConversationMessageProps> = ({ iconUrl, senderName, content }) => {
	return (
		<div className="flex flex-row gap-3">
			<div className="mt-1 w-9 h-9 rounded-full bg-white">
				<img src={iconUrl} alt="icon" className="w-full h-full rounded-full" />
			</div>
			<div className="flex flex-col gap-1">
				<div>
					<p className="font-medium">{senderName}</p>
				</div>
				<div className="w-fit px-4 py-2 rounded-[10px] bg-white bg-opacity-20">
					<p>{content}</p>
				</div>
			</div>
		</div>
	);
};

export default OtherConversationMessage;
