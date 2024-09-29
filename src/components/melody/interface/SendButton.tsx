import React from "react";

interface SendButtonProps {
	onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
	return (
		<div
			className="flex w-14 h-14 items-center justify-center rounded-xl bg-white bg-opacity-15 cursor-pointer duration-500"
			onClick={onClick}
		>
			<img src="/icons/melody/text-input-send.png" className="w-[20px] h-[20px] rounded-xl cursor-pointer" alt="Send prompt" />
		</div>
	);
};

export default SendButton;
