"use client";

import ChatInterface from "@/components/melody/ChatInterface/ChatInterface";
import SideExtensions from "@/components/melody/SideExtensions/SideExtensions";
import UnsignedChatInterface from "@/components/melody/UnsignedChatInterface/UnsignedChatInterface";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function MelodyPage() {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const [isSideExtensionsOpen, setIsSideExtensionsOpen] = useState(true);
	const [isCollapseButtonShown, setIsCollapseButtonShown] = useState(false);

	const handleSideExtension = () => {
		setIsSideExtensionsOpen(!isSideExtensionsOpen);
	};

	return (
		<div className="relative flex flex-row w-full h-full">
			{isAuthenticated ? (
				<>
					<div className="w-[1px] bg-gray-300 bg-opacity-20 z-10"></div>
					{isSideExtensionsOpen && <SideExtensions />}
					<div className={`w-[1px] bg-gray-300 bg-opacity-20 z-10`}></div>
					<div
						onMouseEnter={() => setIsCollapseButtonShown(true)}
						onMouseLeave={() => setIsCollapseButtonShown(false)}
						className="absolute h-full flex w-5 px-1 items-center cursor-pointer duration-500 z-10 bg-white bg-opacity-0 hover:bg-opacity-10"
						onClick={handleSideExtension}
					>
						<img
							src="/icons/melody/arrow.png"
							className={`w-3 h-3 cursor-pointer filter invert 
										${isSideExtensionsOpen ? "rotate-180" : ""} duration-500
										${isCollapseButtonShown ? "" : "opacity-0"}`}
							style={{ flexShrink: 0 }}
						/>
					</div>
					<div className="flex w-full h-full items-center justify-center">
						<ChatInterface />
					</div>
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
