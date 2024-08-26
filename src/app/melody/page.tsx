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
		<div className="relative flex flex-row w-screen h-screen bg-black bg-opacity-80 text-white">
			<img
				src={"https://wallpapers.com/images/hd/1920-x-1080-hd-ydvvfje0bdoimttn.jpg"}
				className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
				style={{ zIndex: -10 }}
			/>
			{isAuthenticated ? (
				<>
					<div className="w-[1px] bg-gray-300 bg-opacity-20"></div>
					{isSideExtensionsOpen && <SideExtensions />}
					<div className={`relative`}>
						<div
							onMouseEnter={() => setIsCollapseButtonShown(true)}
							onMouseLeave={() => setIsCollapseButtonShown(false)}
							className="absolute h-full flex w-5 px-1 z-10 items-center cursor-pointer duration-300 bg-white bg-opacity-0 hover:bg-opacity-10"
							onClick={handleSideExtension}
						>
							<img
								src="/icons/melody/arrow.png"
								className={`w-3 h-3 cursor-pointer filter invert 
										${isSideExtensionsOpen ? "rotate-180" : ""} duration-500
										${isCollapseButtonShown ? "" : "opacity-0"}`}
							/>
						</div>
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
