"use client";

import { ChatSocketProvider } from "@/contexts/ChatSocketContext";
import ChatInterface from "@/components/melody/interface/ChatInterface";
import ConversationSelectionPanel from "@/components/melody/extensions/conversations/ConversationSelectionPanel";
import MelodyProfileBanner from "@/components/melody/extensions/ModelProfileBanner/MelodyProfileBanner";
import MisuProfileBanner from "@/components/melody/extensions/ModelProfileBanner/MisuProfileBanner";
import { useState } from "react";
import CustomerServiceBanner from "@/components/cs/CustomerServiceBanner";
import CustomerServiceInterface from "@/components/cs/CustomerServiceInterface";
import BackButton from "@/components/layout/BackButton";
import { CustomizeBackgroundProvider } from "@/contexts/CustomizeBackgroundContext";

export default function MelodyPage() {
	const [isCollapseButtonShown, setIsCollapseButtonShown] = useState(false);
	const [isSideExtensionsOpen, setIsSideExtensionsOpen] = useState(true);
	const [isCustomerServiceInterfaceOpen, setIsCustomerServiceInterfaceOpen] = useState(false);
	const handleCustomerServiceInterfaceOpen = () => {
		setIsCustomerServiceInterfaceOpen(true);
	};
	const handleCustomerServiceInterfaceClose = () => {
		setIsCustomerServiceInterfaceOpen(false);
	};
	const handleSideExtension = () => {
		setIsSideExtensionsOpen((prev) => !prev);
	};
	return (
		<ChatSocketProvider>
			<CustomizeBackgroundProvider>
				<div className="relative flex flex-row w-screen h-screen bg-black bg-opacity-80 text-white">
					<img
						src={
							"https://asset.gecdesigns.com/img/wallpapers/blue-purple-beautiful-scenery-ultra-hd-wallpaper-4k-sr10012421-1706505497434-cover.webp"
						}
						className="absolute top-0 left-0 w-full h-full object-cover"
						style={{ zIndex: -1 }}
					/>
					{isSideExtensionsOpen && (
						<div className="relative flex flex-col h-full px-2">
							<div className="flex flex-col w-full items-center justify-center gap-2 py-4 px-2">
								<MelodyProfileBanner />
								<MisuProfileBanner />
							</div>
							<div className="flex w-full items-center justify-center p-3">
								<p className="text-lg font-semibold">Chats</p>
							</div>
							<ConversationSelectionPanel />
							<div className="flex items-center justify-center w-full p-2">
								<CustomerServiceBanner
									isCustomerServiceInterfaceOpen={isCustomerServiceInterfaceOpen}
									onClick={handleCustomerServiceInterfaceOpen}
								/>
							</div>
							{isCustomerServiceInterfaceOpen && (
								<div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-100 z-10 cursor-pointer">
									<BackButton />
									<CustomerServiceInterface onClose={handleCustomerServiceInterfaceClose} />
								</div>
							)}
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
			</CustomizeBackgroundProvider>
		</ChatSocketProvider>
	);
}
