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
		<div className="flex flex-row w-full h-full">
			{isAuthenticated ? (
				<>
					{/* <div className="w-[1px] bg-gray-300 bg-opacity-20 z-10"></div> This is a line. */}
					{isSideExtensionsOpen ? null : <div className={`w-[1px] bg-gray-300 bg-opacity-20 z-10`}></div>}
					{isSideExtensionsOpen && <SideExtensions />}
					<div className={`w-[1px] bg-gray-300 bg-opacity-20 z-10`}></div>
					<div
						onMouseEnter={() => setIsCollapseButtonShown(true)}
						onMouseLeave={() => setIsCollapseButtonShown(false)}
						className="flex items-center p-1 bg-white bg-opacity-0 hover:bg-opacity-[0.05] z-10 cursor-pointer duration-500"
						onClick={handleSideExtension}
					>
						<img
							src="/icons/melody/arrow.png"
							className={`w-3 h-3 cursor-pointer filter invert 
										${isSideExtensionsOpen ? "rotate-180" : ""} duration-500
										${isCollapseButtonShown ? "" : "opacity-0"}`}
						/>
					</div>
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
