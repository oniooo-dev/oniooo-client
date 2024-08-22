import React, { useState } from "react";

const VoiceButton = () => {
	const [isRecording, setIsRecording] = useState<boolean>(false);

	const handleRecordClick = () => {
		setIsRecording(!isRecording);
	}

	return (
		<div onClick={handleRecordClick}>
			{isRecording ? (
				<div className="flex w-12 h-12 items-center justify-center rounded-lg bg-white bg-opacity-15 hover:bg-opacity-30 cursor-pointer">
					<img src="/icons/melody/stop-recording.png" className="w-5 h-5 object-contain opacity-60 filter invert" />
				</div>
			) : (
				<div className="flex w-12 h-12 items-center justify-center rounded-lg bg-white bg-opacity-15 hover:bg-opacity-30 cursor-pointer">
					<img src="/icons/melody/microphone.png" className="w-4 h-4 object-contain opacity-60" />
				</div>
			)}
		</div>
	);
};

export default VoiceButton;
