import React from "react";

const MelodyHeader = () => {
	const iconUrl = "https://tr.rbxcdn.com/196d20775e64758b25c76b4b2e470d89/420/420/Hat/Webp";
	return (
		<div className="flex flex-col w-full items-center justify-center mt-24 gap-2 mb-4">
			<div>
				<div className="w-16 h-16 object-contain rounded-full">
					<img src={iconUrl} className="w-16 h-16 rounded-full" />
				</div>
			</div>
			<div className="flex flex-col items-center w-full gap-1">
				<p className="font-medium text-xl">Melody</p>
			</div>
		</div>
	);
};

export default MelodyHeader;
