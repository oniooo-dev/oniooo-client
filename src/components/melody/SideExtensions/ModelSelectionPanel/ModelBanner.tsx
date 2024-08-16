import { RootState } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ModelTools from "./ModelTools";
import { selectModelById } from "@/store/features/melody/melodySlice";
import { useAppDispatch } from "@/store/hooks";

interface ModelBannerProps {
	modelId: string;
	iconUrl?: string;
	modelName: string;
	onClick: (modelId: string) => void;
}

const ModelBanner: React.FC<ModelBannerProps> = ({ modelId, iconUrl, modelName, onClick }) => {
	const dispatch = useAppDispatch();
	const selectedModelId = useSelector((state: RootState) => state.melody.selectedModelId);
	const [isHovered, setIsHovered] = useState(false);
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const modelToolsRef = useRef<HTMLDivElement>(null);

	const handleOpenOptions = () => {
		setIsOptionsOpen(!isOptionsOpen);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		setIsOptionsOpen(false);
	};

	const handleMouseClick = () => {
		console.log("Selected model id: ", modelId);
		dispatch(selectModelById(modelId));
	};

	return (
		<div className="relative flex flex-row" onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave}>
			<div
				className={`flex flex-row items-center justify-between w-full h-10 px-3 bg-opacity-20 rounded-[10px] cursor-pointer 
							${selectedModelId === modelId ? "bg-white hover:bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"} 
							duration-300`}
				onClick={handleMouseClick}
			>
				<div className="flex flex-row gap-2 items-center">
					<img src={iconUrl} className="w-8 h-8 rounded-full" />
					<p>{modelName}</p>
				</div>
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
						ref={modelToolsRef}
						className="absolute right-[-105px] flex flex-row"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<div className="px-2"></div>
						<ModelTools />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ModelBanner;
