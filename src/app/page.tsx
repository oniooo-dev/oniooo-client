"use client";

import ChatInterface from "@/components/melody/ChatInterface/ChatInterface";
import SideExtensions from "@/components/melody/SideExtensions/SideExtensions";
import UnsignedChatInterface from "@/components/melody/UnsignedChatInterface/UnsignedChatInterface";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

export default function MelodyPage() {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	return (
		<div className="flex flex-row w-full h-full">
			{isAuthenticated ? (
				<>
					<div className="w-[1px] bg-gray-300 bg-opacity-20 z-10"></div> {/* This is a line. */}
					<SideExtensions />
					<div className="w-[1px] bg-gray-300 bg-opacity-20 z-10"></div> {/* This is a line. */}
					<ChatInterface />
				</>
			) : (
				<>
					<div className="w-[1px] bg-gray-300 bg-opacity-20 z-10"></div> {/* This is a line. */}
					<UnsignedChatInterface />
				</>
			)}
		</div>
	);
}
