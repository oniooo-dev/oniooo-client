import React from "react";

const UnsignedChatHeader = () => {
	return (
		<div className="flex flex-col w-full items-center justify-center mt-24 gap-4 mb-8">
			<div>
				<div className="w-16 h-16 bg-white rounded-full">
					<img src="/icons/melody/melody-pfp.png" className="w-16 h-16 rounded-full" />
				</div>
			</div>
			<div className="flex flex-col items-center w-full gap-2">
				<p className="font-normal text-lg">Melody</p>
				<p className="font-light text-sm">Description Description Description</p>
			</div>
		</div>
	);
};

export default UnsignedChatHeader;
