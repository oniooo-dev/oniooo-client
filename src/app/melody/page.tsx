import ChatInterface from "@/components/melody/ChatInterface/ChatInterface";
import SideExtensions from "@/components/melody/SideExtensions/SideExtensions";
import React from "react";

export default function MelodyPage() {
	return (
		<div className="flex flex-row w-full h-full">
			<ChatInterface />
			<SideExtensions />
		</div>
	);
}
