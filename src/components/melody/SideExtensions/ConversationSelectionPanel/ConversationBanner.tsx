import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ConversationTools from "./ConversationTools";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { selectConversationById } from "@/store/features/melody/melodySlice";

interface ConversationBannerProps {
	conversationId: string;
	modelId: string;
	title: string;
}

const ConversationBanner: React.FC<ConversationBannerProps> = ({ conversationId, modelId, title }) => {
	const dispatch = useAppDispatch();
	const selectedConversationId = useSelector((state: RootState) => state.melody.selectedConversationId);
	const [isHovered, setIsHovered] = useState(false);
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const conversationBannerRef = useRef<HTMLDivElement>(null);

	const handleMouseClick = () => {
		console.log("Selected conversation id: ", conversationId);
		dispatch(selectConversationById(conversationId));
	};

	const handleOptionsClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		setIsOptionsOpen((prev) => !prev);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (conversationBannerRef.current && !conversationBannerRef.current.contains(event.target as Node)) {
			setIsOptionsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [conversationBannerRef]);

	return (
		<div ref={conversationBannerRef} className="relative flex flex-row w-[260px]">
			<div
				// When the conversation is selected, the background color of the banner is opacity 20
				// When the options menu is opened, the background color of the banner is opacity 10
				className={`relative flex flex-row items-center justify-between w-full h-10 px-3 bg-opacity-20 rounded-[10px] cursor-pointer
							${isOptionsOpen ? "bg-white bg-opacity-[0.1]" : `${selectedConversationId === conversationId ? "bg-white hover:bg-opacity-[0.15]" : "hover:bg-white hover:bg-opacity-[0.15]"}`} 
							duration-300`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={handleMouseLeave}
				onClick={handleMouseClick}
			>
				<div className="banner-container">
					<div className="title-container">
						<p className="scrolling-title">{title}</p>
					</div>
				</div>
				{isHovered && (
					<div
						className={`absolute right-2 p-2 rounded-full bg-white bg-opacity-0 hover:bg-opacity-20 opacity-60 hover:opacity-100 duration-500`}
						onClick={handleOptionsClick}
					>
						<img src="/icons/melody/bars-sort.png" alt="options icon" className="w-3 h-3" />
					</div>
				)}
			</div>
			<AnimatePresence>
				{isOptionsOpen && (
					<motion.div
						className="absolute right-[-105px] flex flex-row"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<div className="px-2"></div>
						<ConversationTools />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ConversationBanner;
