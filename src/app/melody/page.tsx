"use client";

import EpicBackground from "@/components/background/EpicBackground";
import QuestionButton from "@/components/layout/QuestionButton";
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
	const [isHoveringSideExtension, setIsHoveringSideExtension] = useState(false);
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const chatState = useSelector((state: RootState) => state.melody.chatState);

	const handleSideExtension = () => {
		setIsSideExtensionsOpen((prev) => !prev);
	};

	const handleHoverSideExtension = () => {
		setIsHoveringSideExtension(true);
	};

	const handleLeaveSideExtension = () => {
		setIsHoveringSideExtension(false);
	};

	return (
		// Websocket provider for chat
		<ChatSocketProvider>
			<div className="relative flex-vertical w-screen h-screen bg-black bg-opacity-50 text-white">
				<Navbar />
				{!isSideExtensionsOpen && <QuestionButton />}
				{chatState === ChatState.NEW_CHAT ?
					<video
						src="/videos/new_chat_video.mp4"
						className="absolute top-0 left-0 w-full h-full object-cover"
						style={{ zIndex: -1 }}
						autoPlay
						loop
					/>
					: <EpicBackground />}
				<div
					className="flex-horizontal w-full h-full"
				>
					{
						isSideExtensionsOpen && (
							<div className={`absolute ${isAuthenticated ? `h-[95%]` : `h-[100%]`}`}>
								<LeftPanel />
							</div>
						)
					}
					<div className="flex w-full h-full items-center justify-center">
						<div className={`${isSideExtensionsOpen ? '' : 'absolute'} left-0 flex items-center justify-center w-20 h-full py-4 z-10`}
							onMouseEnter={handleHoverSideExtension}
							onMouseLeave={handleLeaveSideExtension}
						>
							<div
								className={`flex items-center justify-center h-10 w-10 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full cursor-pointer opacity-0 duration-[1000ms] ${isHoveringSideExtension ? 'opacity-100 duration-200' : ''} mb-12`}
								onClick={handleSideExtension}
							>
								<img
									src="/icons/melody/collapse-arrow.png"
									className={`w-[20px] h-auto ${isSideExtensionsOpen ? 'mr-[2px]' : 'ml-[2px]'} filter invert ${isSideExtensionsOpen ? "rotate-180" : ""} ${isSideExtensionsOpen ? 'bg-opacity-10' : ''} duration-500`}
									alt="New Chat"
								/>
							</div>
						</div>
						<div className="flex w-full h-full items-center justify-center">
							{(!isAuthenticated || chatState === ChatState.NEW_CHAT) ? <NewChatInterface /> : <ChatInterface />}
						</div>
					</div>
				</div>
			</div>
		</ChatSocketProvider >
	);
}
