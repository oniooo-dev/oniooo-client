"use client";

import React, { useState } from "react";
import ModelSelectionPanel from "./ModelSelectionPanel/ModelSelectionPanel";
import ExtensionSwitch from "./ExtensionSwitch";
import { AvailableExtensions } from "@/lib/enums";
import ConversationSelectionPanel from "./ConversationSelectionPanel/ConversationSelectionPanel";
import ModelProfileBanner from "./ModelProfileBanner/ModelProfileBanner";

const SideExtensions = () => {
	const [selectedExtension, setSelectedExtension] = useState<AvailableExtensions>(AvailableExtensions.ModelSelection);

	const handleSelectExtension = (selectedId: AvailableExtensions) => {
		setSelectedExtension(selectedId);
	};

	return (
		<div className="flex flex-col w-[300px] px-2">
			<ModelProfileBanner />
			<div className="flex flex-col gap-1">
				<div className="ml-3">
					<ExtensionSwitch onSelect={handleSelectExtension} selectedExtension={selectedExtension} />
				</div>
				{selectedExtension === AvailableExtensions.ModelSelection ? (
					<ModelSelectionPanel />
				) : (
					<ConversationSelectionPanel />
				)}
			</div>
		</div>
	);
};

export default SideExtensions;
