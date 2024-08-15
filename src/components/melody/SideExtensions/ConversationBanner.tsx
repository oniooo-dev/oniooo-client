import React from "react";

interface ConversationBannerProps {
	title: string;
}

const ConversationBanner: React.FC<ConversationBannerProps> = ({ title }) => {
	return (
		<div
			className="flex flex-row w-full px-2 py-3 gap-2 rounded-lg bg-gray-100 cursor-pointer 
                       duration-500 hover:scale-[1.05]
                       text-nowrap text-black"
		>
			<p>{title}</p>
			<p>...</p>
		</div>
	);
};

export default ConversationBanner;
