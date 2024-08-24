import React from "react";

interface OtherConversationMessageProps {
	senderName: string;
	content: string;
}

const OtherConversationMessage: React.FC<OtherConversationMessageProps> = ({ senderName, content }) => {
	return (
		<div className="flex flex-row gap-3 w-[95%]">
			<div className="flex flex-col gap-[6px]">
				<div>
					<p className="font-medium">{senderName}</p>
				</div>
				<div className="w-fit px-4 py-2 rounded-[10px] bg-white bg-opacity-15">
					<p>{content}</p>
				</div>
			</div>
		</div>
	);
};

export default OtherConversationMessage;
