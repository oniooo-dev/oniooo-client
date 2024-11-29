"use client";

import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import EpicBackground from "@/components/background/EpicBackground";
import Chat from "@/components/layout/Chat";
import LeftPanel from "@/components/melody/panel/LeftPanel";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatSocketProvider } from "@/contexts/ChatSocketContext";

export default function MelodyPage() {
	return (
		<AuthProvider>
			<ChatSocketProvider>
				<div className="relative flex flex-col w-[100vw] h-[100vh] bg-black bg-opacity-[0.83] text-white">
					<p className="absolute opacity-0" style={{ visibility: "hidden" }}>
						Oniooo helps you create stunning images, videos, music, and more with cutting-edge AI tools—all from a single platform.
						Whether you're generating creative content, composing music, or editing visuals, Oniooo makes it seamless by eliminating
						the need to switch between multiple apps. Simply ask, and Oniooo delivers results tailored to your vision. Experience the
						future of creativity with Oniooo, where imagination meets simplicity!
					</p>
					<EpicBackground />
					<div className="absolute top-4 right-4 z-10">
						<GoogleAuthButton />
					</div>
					<div className="flex flex-row w-full h-full pl-4">
						<div className="w-fit h-full py-4">
							<LeftPanel />
						</div>
						<Chat />
					</div>
				</div>
			</ChatSocketProvider>
		</AuthProvider>
	);
}
