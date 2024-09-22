"use client";

import EpicBackground from "@/components/background/EpicBackground";
import LeftPanel from "@/components/melody/extensions/LeftPanel";
import ChatInterface from "@/components/melody/interface/ChatInterface";
import NewChatInterface from "@/components/melody/NewChatInterface/NewChatInterface";
import Navbar from "@/components/Navbar/Navbar";
import { ChatSocketProvider } from "@/contexts/ChatSocketContext";
import { ChatState } from "@/lib/enums";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function MelodyPage() {
	const [isSideExtensionsOpen, setIsSideExtensionsOpen] = useState(true);
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const chatState = useSelector((state: RootState) => state.melody.chatState)

	const handleSideExtension = () => {
		setIsSideExtensionsOpen((prev) => !prev);
	};

	return (
		<ChatSocketProvider>
			<div className="relative flex-vertical w-screen h-screen bg-black bg-opacity-100 text-white">
				<Navbar />
				{/* <EpicBackground /> */}
				<div className="flex-horizontal w-full h-full py-2">
					{
						isSideExtensionsOpen && (
							<LeftPanel />
						)
					}
					{
						(!isAuthenticated || chatState === ChatState.NEW_CHAT) ? <NewChatInterface /> : (
							<>
								<div
									className="absolute top-4 left-4 flex items-center justify-center px-5 py-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-xl duration-500 cursor-pointer z-10"
									onClick={handleSideExtension}
								>
									<p className="cursor-pointer text-xl opacity-40 font-medium">Melody</p>
								</div>
								<div className="flex w-full h-full items-center justify-center">
									<ChatInterface />
								</div>
							</>
						)
					}
				</div>
			</div>
		</ChatSocketProvider>
	);
}
