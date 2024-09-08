"use client";

import UnsignedChatInterface from "@/components/melody/unsigned/UnsignedChatInterface";
import { ChatSocketProvider } from "@/contexts/ChatSocketContext";
import React from "react";

const TryPage = () => {
	return (
		<ChatSocketProvider>
			<div className="flex w-screen h-screen bg-black bg-opacity-60 text-white">
				<UnsignedChatInterface />
			</div>
		</ChatSocketProvider>
	);
};

export default TryPage;
