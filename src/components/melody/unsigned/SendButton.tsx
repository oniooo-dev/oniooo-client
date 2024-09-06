import React from "react";
import { useChatSocket } from "@/contexts/ChatSocketContext";

interface SendButtonProps {
	onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
	const { loading } = useChatSocket();

	const handleClick = () => {
		if (!loading) {
			onClick();
		}
	};

	return (
		<div
			className={`flex w-12 h-12 items-center justify-center 
						rounded-lg bg-black ${loading ? `bg-opacity-60` : `bg-opacity-30`} 
						hover:bg-opacity-50 cursor-pointer`}
			onClick={handleClick}
		>
			<img src="/icons/melody/text-input-send.png" className="w-4 h-4 cursor-pointer" alt="Send prompt" />
		</div>
	);
};

export default SendButton;
