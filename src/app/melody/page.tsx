"use client";

import EpicBackground from "@/components/background/EpicBackground";
import Background from "@/components/layout/Background";
import Chat from "@/components/layout/Chat";
import UserCorner from "@/components/layout/UserCorner";
import LeftPanel from "@/components/melody/extensions/LeftPanel";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatSocketProvider } from "@/contexts/ChatSocketContext";

export default function MelodyPage() {
	return (
		<AuthProvider>
			<ChatSocketProvider>
				<div className="relative flex flex-col w-screen h-screen bg-black bg-opacity-50 text-white">
					<Background />
					<EpicBackground />
					<div className="absolute top-4 right-4">
						<UserCorner />
					</div>
					<Background />
					<div className="flex flex-row w-full h-full p-4">
						<LeftPanel />
						<Chat />
					</div>
				</div>
			</ChatSocketProvider >
		</AuthProvider>
	);
}
