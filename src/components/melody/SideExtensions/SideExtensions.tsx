"use client";

import React, { useState } from "react";
import ModelSelectionPanel from "./ModelSelectionPanel";
import ExtensionSwitch from "./ExtensionSwitch";
import { AvailableExtensions } from "@/lib/enums";
import ConversationSelectionPanel from "./ConversationSelectionPanel";
import ModelProfileBanner from "./ModelProfileBanner/ModelProfileBanner";

const SideExtensions = () => {
	const [selectedExtension, setSelectedExtension] = useState<AvailableExtensions>(AvailableExtensions.ModelSelection);

	const handleSelectExtension = (selectedId: AvailableExtensions) => {
		setSelectedExtension(selectedId);
	};

	return (
		<div className="flex flex-col w-[300px]">
			<ModelProfileBanner />
			<div className="flex flex-col gap-2">
				<div className="px-2">
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
