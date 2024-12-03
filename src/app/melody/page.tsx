"use client";

import MelodyInterface from "@/components/melody/interface/MelodyInterface";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatSocketProvider } from "@/contexts/ChatSocketContext";

export default function MelodyPage() {
	return (
		<AuthProvider>
			<p className="absolute opacity-0" style={{ visibility: "hidden" }}>
				{`
							Oniooo helps you create stunning images, videos, music, and more with cutting-edge AI tools—all from a single platform.
							Whether you're generating creative content, composing music, or editing visuals, Oniooo makes it seamless by eliminating
							the need to switch between multiple apps. Simply ask, and Oniooo delivers results tailored to your vision. Experience the
							future of creativity with Oniooo, where imagination meets simplicity!
						`}
			</p>
			<ChatSocketProvider>
				<MelodyInterface />
			</ChatSocketProvider>
		</AuthProvider>
	);
}
