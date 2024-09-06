"use client";

import { ChatSocketProvider } from "@/contexts/ChatSocketContext";
import ChatInterface from "@/components/melody/interface/ChatInterface";
import ConversationSelectionPanel from "@/components/melody/extensions/conversations/ConversationSelectionPanel";
import MelodyProfileBanner from "@/components/melody/extensions/ModelProfileBanner/MelodyProfileBanner";
import MisuProfileBanner from "@/components/melody/extensions/ModelProfileBanner/MisuProfileBanner";
import { useState } from "react";

export default function MelodyPage() {
	const [isCollapseButtonShown, setIsCollapseButtonShown] = useState(false);
	const [isSideExtensionsOpen, setIsSideExtensionsOpen] = useState(true);
	const handleSideExtension = () => {
		setIsSideExtensionsOpen((prev) => !prev);
	};
	return (
		<ChatSocketProvider>
			<div className="relative flex flex-row w-screen h-screen bg-black bg-opacity-80 text-white">
				<img
					src={
						"https://asset.gecdesigns.com/img/wallpapers/blue-purple-beautiful-scenery-ultra-hd-wallpaper-4k-sr10012421-1706505497434-cover.webp"
					}
					className="absolute top-0 left-0 w-full h-full object-cover"
					style={{ zIndex: -10 }}
				/>
				{/* <div className="w-[1px] bg-gray-300 bg-opacity-20"></div> */}
				{isSideExtensionsOpen && (
					<div className="flex flex-col h-full px-2">
						<div className="flex flex-col w-full items-center justify-center gap-2 py-4 px-2">
							<MelodyProfileBanner />
							<MisuProfileBanner />
						</div>
						<div className="flex w-full items-center justify-center p-3">
							<p className="text-lg font-semibold">Chats</p>
						</div>
						<ConversationSelectionPanel />
					</div>
				)}
				<div className={`relative`}>
					<div
						onMouseEnter={() => setIsCollapseButtonShown(true)}
						onMouseLeave={() => setIsCollapseButtonShown(false)}
						className={`absolute h-full flex w-5 px-1 z-10 items-center ${isSideExtensionsOpen && "rounded-l-2xl"} bg-white bg-opacity-0 hover:bg-opacity-10 cursor-pointer duration-500`}
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
					<ChatInterface isSideExtensionsOpen={isSideExtensionsOpen} />
				</div>
			</div>
		</ChatSocketProvider>
	);
}
