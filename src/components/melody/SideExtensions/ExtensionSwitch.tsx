import React, { useEffect } from "react";
import { AvailableExtensions } from "@/lib/enums";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ExtensionSwitchProps {
	onSelect: (selectedId: AvailableExtensions) => void;
	selectedExtension: AvailableExtensions;
}

const ExtensionSwitch: React.FC<ExtensionSwitchProps> = ({ onSelect, selectedExtension }) => {
	const conversationId = useSelector((state: RootState) => state.melody.selectedConversationId);
	const selectedModelId = useSelector((state: RootState) => state.melody.selectedModelId);

	useEffect(() => {
		if (selectedExtension === AvailableExtensions.ModelSelection && !selectedModelId) {
			onSelect(AvailableExtensions.HistorySelection);
		} else if (selectedExtension === AvailableExtensions.HistorySelection && !conversationId) {
			onSelect(AvailableExtensions.ModelSelection);
		}
	}, [])
	
	return (
		<div className="flex flex-row items-center w-full h-8 gap-2">
			<div onClick={() => onSelect(AvailableExtensions.ModelSelection)}>
				<div className="rounded-lg cursor-pointer">
					<p
						className={
							selectedExtension === AvailableExtensions.ModelSelection
								? `text-white`
								: `text-white text-opacity-50`
						}
					>{`Apps`}</p>
				</div>
			</div>
			<div>
				<p className="text-white text-opacity-40">|</p>
			</div>
			<div onClick={() => onSelect(AvailableExtensions.HistorySelection)}>
				<div className="rounded-lg cursor-pointer">
					<p
						className={
							selectedExtension === AvailableExtensions.HistorySelection
								? `text-white`
								: `text-white text-opacity-50`
						}
					>{`History`}</p>
				</div>
			</div>
		</div>
	);
};

export default ExtensionSwitch;
