import React from "react";

const ConversationTools = () => {
	return (
		<div style={{ zIndex: 9999 }}>
			<div className="flex flex-row gap-2">
				<div
					className="flex items-center justify-center w-10 h-10 cursor-pointer
								rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20"
				>
					<img src="/icons/melody/edit-pencil.png" className="w-[18px] h-[18px]" />
				</div>
				<div
					className="flex items-center justify-center w-10 h-10 cursor-pointer 
								rounded-lg bg-red-400 bg-opacity-20 hover:bg-opacity-40"
				>
					<img src="/icons/melody/trash.png" className="w-[18px] h-[18px]" />
				</div>
			</div>
		</div>
	);
};

export default ConversationTools;
