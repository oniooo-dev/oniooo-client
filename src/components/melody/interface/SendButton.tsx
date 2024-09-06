import React from "react";

interface SendButtonProps {
	onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
	return (
		<div
			className="flex w-12 h-12 items-center justify-center rounded-[10px] bg-black bg-opacity-30 cursor-pointer duration-500"
			onClick={onClick}
		>
			<img src="/icons/melody/text-input-send.png" className="w-4 h-4 cursor-pointer" alt="Send prompt" />
		</div>
	);
};

export default SendButton;
