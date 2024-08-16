import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ConversationTools from "./ConversationTools";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { fetchMessagesByConversationId } from "@/store/features/melody/melodyThunks";
import { selectConversationById } from "@/store/features/melody/melodySlice";

interface ConversationBannerProps {
	conversationId: string;
	title: string;
}

const ConversationBanner: React.FC<ConversationBannerProps> = ({ conversationId, title }) => {
	const dispatch = useAppDispatch();
	const selectedConversationId = useSelector((state: RootState) => state.melody.selectedConversationId);
	const [isHovered, setIsHovered] = useState(false);
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);

	useEffect(() => {
		dispatch(fetchMessagesByConversationId({ conversationId: conversationId }));
	}, [dispatch]);

	const handleOpenOptions = () => {
		setIsOptionsOpen(!isOptionsOpen);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		setIsOptionsOpen(false);
	};

	const handleMouseClick = () => {
		console.log("Selected conversation id: ", conversationId);
		dispatch(selectConversationById(conversationId));
	};

	return (
		<div
			className="relative flex flex-row"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
			onClick={handleMouseClick}
		>
			<div
				className={`flex flex-row items-center justify-between w-full h-10 px-3 bg-opacity-20 rounded-[10px] cursor-pointer 
							${selectedConversationId === conversationId ? "bg-white hover:bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"} 
							duration-300`}
			>
				<p>{title}</p>
				{isHovered && (
					<div
						className="p-2 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 opacity-50 hover:opacity-100 duration-500"
						onClick={handleOpenOptions}
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
