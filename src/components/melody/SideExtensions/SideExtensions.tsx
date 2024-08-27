"use client";

import React, { useState } from "react";
import ModelSelectionPanel from "./ModelSelectionPanel/ModelSelectionPanel";
import ExtensionSwitch from "./ExtensionSwitch";
import { AvailableExtensions } from "@/lib/enums";
import ConversationSelectionPanel from "./ConversationSelectionPanel/ConversationSelectionPanel";
import ModelProfileBanner from "./ModelProfileBanner/ModelProfileBanner";
import Navbar from "@/components/Navbar/Navbar";

const SideExtensions = () => {
	const [selectedExtension, setSelectedExtension] = useState<AvailableExtensions>(AvailableExtensions.ModelSelection);

	const handleSelectExtension = (selectedId: AvailableExtensions) => {
		setSelectedExtension(selectedId);
	};

	return (
		<div className="flex flex-col w-[300px] items-center px-2 py-2 ml-2">
			<Navbar />
			<ModelProfileBanner />
			<div className="flex flex-col w-full h-full gap-2">
				<div className="ml-3">
					<ExtensionSwitch onSelect={handleSelectExtension} selectedExtension={selectedExtension} />
				</div>
				{selectedExtension === AvailableExtensions.ModelSelection ? <ModelSelectionPanel /> : <ConversationSelectionPanel />}
			</div>
		</div>
	);
};

export default SideExtensions;
