import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ChatHeader = () => {
	const aiModel = useSelector((state: RootState) => state.melody.currentSelectedModel)?.ai_model;
	
	if (!aiModel) {
		return (
			<div className="flex flex-col w-full items-center justify-center mt-24 gap-4 mb-2">
				<div>
				<div className="w-16 h-16 rounded-full bg-white bg-opacity-50 animate-pulse"></div>
				</div>
				<div className="flex flex-col items-center w-full gap-2">
					<div className="w-1/6 h-4 bg-white bg-opacity-40 rounded animate-pulse"></div>
				</div>
			</div>
		)
	}
	
	return (
		<div className="flex flex-col w-full items-center justify-center mt-24 gap-2 mb-2">
			<div>
				<div className="w-16 h-16 object-contain rounded-full">
					<img src={aiModel?.icon_url} className="w-16 h-16 rounded-full" />
				</div>
			</div>
			<div className="flex flex-col items-center w-full gap-1">
				<p className="font-medium text-xl">{aiModel?.name}</p>
			</div>
		</div>
	);
};

export default ChatHeader;
