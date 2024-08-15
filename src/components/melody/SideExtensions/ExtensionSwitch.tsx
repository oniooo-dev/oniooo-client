import React from "react";
import ExtensionIcon from "./ExtensionIcon";
import { AvailableExtensions } from "@/lib/enums";

interface ExtensionSwitchProps {
	onSelect: (selectedId: AvailableExtensions) => void;
	selectedExtension: AvailableExtensions;
}

const ExtensionSwitch: React.FC<ExtensionSwitchProps> = ({ onSelect, selectedExtension }) => {
	return (
		<div className="flex flex-row gap-2">
			<div onClick={() => onSelect(AvailableExtensions.ModelSelection)}>
				<div className="rounded-lg cursor-pointer">
					<p
						className={
							selectedExtension === AvailableExtensions.ModelSelection ? `text-white` : `text-gray-700`
						}
					>{`Apps`}</p>
				</div>
			</div>
			<div>|</div>
			<div onClick={() => onSelect(AvailableExtensions.HistorySelection)}>
				<div className="rounded-lg cursor-pointer">
					<p
						className={
							selectedExtension === AvailableExtensions.HistorySelection ? `text-white` : `text-gray-700`
						}
					>{`History`}</p>
				</div>
			</div>
		</div>
	);
};

export default ExtensionSwitch;
