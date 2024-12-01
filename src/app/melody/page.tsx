"use client";

import EpicBackground from "@/components/background/EpicBackground";
import Chat from "@/components/layout/Chat";
import UserCorner from "@/components/layout/UserCorner";
import LeftPanel from "@/components/melody/panel/LeftPanel";
import MochiPaymentFailureModal from "@/components/mochis/MochiPaymentFailureModal";
import MochiPaymentSuccessModal from "@/components/mochis/MochiPaymentSuccessModal";
import AuthModal from "@/components/modals/AuthModal";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatSocketProvider } from "@/contexts/ChatSocketContext";
import { useState } from "react";

export default function MelodyPage() {

	// Modals
	const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
	const [showFailureModal, setShowFailureModal] = useState<boolean>(false);
	const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

	const openAuthModal = () => {
		setShowAuthModal(true);
	};

	const closeAuthModal = () => {
		setShowAuthModal(false);
	};

	return (
		<AuthProvider>
			<ChatSocketProvider>
				<div className="relative flex flex-col w-[100vw] h-[100vh] bg-black bg-opacity-[0.83] text-white">
					<p className="absolute opacity-0" style={{ visibility: "hidden" }}>
						{`
							Oniooo helps you create stunning images, videos, music, and more with cutting-edge AI tools—all from a single platform.
							Whether you're generating creative content, composing music, or editing visuals, Oniooo makes it seamless by eliminating
							the need to switch between multiple apps. Simply ask, and Oniooo delivers results tailored to your vision. Experience the
							future of creativity with Oniooo, where imagination meets simplicity!
						`}
					</p>
					<EpicBackground />
					{
						showSuccessModal &&
						<MochiPaymentSuccessModal
							show={showSuccessModal}
							onClose={
								() => setShowSuccessModal(false)
							}
						/>
					}
					{
						showFailureModal &&
						<MochiPaymentFailureModal
							show={showFailureModal}
							onClose={
								() => setShowFailureModal(false)
							}
						/>
					}
					{
						showAuthModal &&
						<AuthModal
							isOpen={showAuthModal}
							onClose={closeAuthModal}
						/>
					}
					<div className="absolute top-4 right-4 z-10">
						<UserCorner />
					</div>
					<div className="flex flex-row w-full h-full pl-4">
						<div className="w-fit h-full py-4">
							<LeftPanel />
						</div>
						<Chat openAuthModal={openAuthModal} />
					</div>
				</div>
			</ChatSocketProvider>
		</AuthProvider>
	);
}
