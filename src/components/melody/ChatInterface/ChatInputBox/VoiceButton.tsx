import React from "react";

const VoiceButton = () => {
	return (
		<div className="flex w-12 h-12 items-center justify-center rounded-lg bg-white bg-opacity-15 hover:bg-opacity-30 cursor-pointer">
			<img src="/icons/melody/microphone.png" className="w-4 h-4 object-contain opacity-60" />
		</div>
	);
};

export default VoiceButton;
