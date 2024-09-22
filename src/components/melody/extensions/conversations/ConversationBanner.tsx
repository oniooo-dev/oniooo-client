import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ConversationTools from "./ConversationTools";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/useAppDispatch";
import { selectChat } from "@/store/features/melody/melodySlice";

interface ConversationBannerProps {
	chatId: string;
	title: string;
}

const ConversationBanner: React.FC<ConversationBannerProps> = ({ chatId, title }) => {
	const dispatch = useAppDispatch();
	const selectedChatId = useSelector((state: RootState) => state.melody.selectedChatId);
	const [isHovered, setIsHovered] = useState(false);
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const conversationBannerRef = useRef<HTMLDivElement>(null);

	const handleMouseClick = () => {
		console.log("Selected conversation id: ", chatId);
		dispatch(selectChat({ chatId }));
	};

	const handleOptionsClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		setIsOptionsOpen((prev) => !prev);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
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
				className={`relative flex flex-row items-center justify-between w-full h-12 px-3 py-3 bg-opacity-20 rounded-[10px] cursor-pointer duration-300
							${isOptionsOpen ? "bg-white bg-opacity-[0.1]" : `${selectedChatId === chatId ? "bg-white hover:bg-opacity-[0.15]" : "hover:bg-white hover:bg-opacity-[0.15]"}`}`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleMouseClick}
			>
				<div
					className={`${isOptionsOpen || isHovered ? `banner-container-clicked` : `banner-container`} ${selectedChatId === chatId ? "px-1" : "hover:px-1"} duration-300`}
				>
					<div className="title-container duration-500">
						<p className="scrolling-title">{title}</p>
					</div>
				</div>
				{(isOptionsOpen || isHovered) && (
					<div
						className={`absolute right-2 p-2 rounded-full bg-white bg-opacity-0 ${isOptionsOpen ? "bg-opacity-20" : "hover:bg-opacity-20"} opacity-60 hover:opacity-100 duration-500`}
						onClick={handleOptionsClick}
					>
						<img src="/icons/melody/bars-sort.png" alt="options icon" className="w-3 h-3" />
					</div>
				)}
			</div>
			<AnimatePresence>
				{isOptionsOpen && (
					<motion.div
						className="absolute top-1 right-[-105px] flex flex-row z-50"
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
