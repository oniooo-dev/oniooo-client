import React from "react";
import { AvailableExtensions } from "@/lib/enums";

interface ExtensionSwitchProps {
	onSelect: (selectedId: AvailableExtensions) => void;
	selectedExtension: AvailableExtensions;
}

const ExtensionSwitch: React.FC<ExtensionSwitchProps> = ({ onSelect, selectedExtension }) => {
	return (
		<div className="flex flex-row items-center h-8 gap-2">
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
