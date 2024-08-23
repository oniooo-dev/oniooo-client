"use client";

import ChatInterface from "@/components/melody/ChatInterface/ChatInterface";
import SideExtensions from "@/components/melody/SideExtensions/SideExtensions";
import UnsignedChatInterface from "@/components/melody/UnsignedChatInterface/UnsignedChatInterface";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function MelodyPage() {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const [isSideExtensionsOpen, setIsSideExtensionsOpen] = useState(false);

	const handleSideExtension = () => {
		setIsSideExtensionsOpen(!isSideExtensionsOpen);
	};

	return (
		<div className="flex flex-row w-full h-full">
			{isAuthenticated ? (
				<>
					{isSideExtensionsOpen ? null : <div className={`w-[1px] bg-gray-300 bg-opacity-20 z-10`}></div>}
					{isSideExtensionsOpen && <SideExtensions /> }
					<div className="w-[1px] hover:w-[3px] bg-gray-300 hover:bg-blue-500 bg-opacity-20 z-10 cursor-pointer" onClick={handleSideExtension}></div>
					<ChatInterface />
				</>
			) : (
				<>
					<div className="w-[1px] bg-gray-300 bg-opacity-20 z-10"></div>
					<UnsignedChatInterface />
				</>
			)}
		</div>
	);
}
