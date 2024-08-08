"use client";

import React, { useState } from "react";
import ModelSelectionPanel from "./ModelSelectionPanel";
import ExtensionSwitch from "./ExtensionSwitch";
import { AvailableExtensions } from "@/lib/enums";
import ConversationSelectionPanel from "./ConversationSelectionPanel";

const SideExtensions = () => {
	const [selectedExtension, setSelectedExtension] = useState<AvailableExtensions>(AvailableExtensions.ModelSelection);

	const handleSelectExtension = (selectedId: AvailableExtensions) => {
		setSelectedExtension(selectedId);
	};

	return (
		<div className="flex flex-col items-center w-[200px] gap-2 p-2">
			<ExtensionSwitch onSelect={handleSelectExtension} />
			{selectedExtension === AvailableExtensions.ModelSelection ? (
				<ModelSelectionPanel />
			) : (
				<ConversationSelectionPanel />
			)}
		</div>
	);
};

export default SideExtensions;
