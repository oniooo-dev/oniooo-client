import React from "react";
import ExtensionIcon from "../other/ExtensionIcon";
import { AvailableExtensions } from "@/lib/enums";

interface ExtensionSwitchProps {
	onSelect: (selectedId: AvailableExtensions) => void;
}

const ExtensionSwitch: React.FC<ExtensionSwitchProps> = ({ onSelect }) => {
	return (
		<div className="flex flex-row gap-2">
			<div onClick={() => onSelect(AvailableExtensions.ModelSelection)}>
				<ExtensionIcon label="SEL" />
			</div>
			<div onClick={() => onSelect(AvailableExtensions.HistorySelection)}>
				<ExtensionIcon label="HIS" />
			</div>
		</div>
	);
};

export default ExtensionSwitch;
