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
}

const ModelBanner: React.FC<ModelBannerProps> = ({ modelId, iconUrl, modelName }) => {
	const dispatch = useAppDispatch();
	const selectedModelId = useSelector((state: RootState) => state.melody.selectedModelId);
	const [isHovered, setIsHovered] = useState(false);
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const modelToolsRef = useRef<HTMLDivElement>(null);

	const handleMouseClick = () => {
		console.log("Selected conversation id: ", modelId);
		dispatch(selectModelById(modelId));
	};

	const handleOpenOptions = (event: React.MouseEvent<HTMLDivElement>) => {
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
		if (modelToolsRef.current && !modelToolsRef.current.contains(event.target as Node)) {
			setIsOptionsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [modelToolsRef]);

	return (
		<div ref={modelToolsRef} className="relative flex flex-row w-[260px]">
			<div
				className={`flex flex-row items-center justify-between w-full h-12 px-3 bg-opacity-20 rounded-[10px] cursor-pointer duration-300
							${isOptionsOpen ? "bg-white bg-opacity-5" : `${selectedModelId === modelId ? "bg-white hover:bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`} `}
				onClick={handleMouseClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div className="banner-container flex flex-row gap-3 items-center">
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
						className="absolute top-1 right-[-56px] flex flex-row"
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
