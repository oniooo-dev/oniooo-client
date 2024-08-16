import ChatInterface from "@/components/melody/ChatInterface/ChatInterface";
import SideExtensions from "@/components/melody/SideExtensions/SideExtensions";
import React from "react";

export default function MelodyPage() {
	return (
		<div className="flex flex-row w-full h-full">
			<SideExtensions />
			<div className="w-[1px] bg-gray-300 bg-opacity-20"></div> {/* This is a line. */}
			<ChatInterface />
		</div>
	);
}
