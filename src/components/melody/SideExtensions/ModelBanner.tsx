import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface ModelBannerProps {
	modelId: string;
	iconUrl?: string;
	modelName: string;
}

const ModelBanner: React.FC<ModelBannerProps> = ({ modelId, iconUrl, modelName }) => {
	const selectedModelId = useSelector((state: RootState) => state.melody.selectedModelId);
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			className={`flex flex-row items-center justify-between w-full h-10 px-2 bg-opacity-20 rounded-[10px] cursor-pointer
						${selectedModelId === modelId ? 'bg-white' : ''}
						duration-300 hover:bg-white ${selectedModelId === modelId ? 'hover:bg-opacity-20' : 'hover:bg-opacity-10'}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
				<div className="flex flex-row gap-2 items-center">
					<img src={iconUrl} className="w-8 h-8 rounded-full" />
					<p>{modelName}</p>
				</div>
				{isHovered && 
					<div className="p-1">
						<img
							src={'https://cdn-icons-png.flaticon.com/512/82/82531.png'} 
							className="w-4 h-4 filter invert" 
						/>
					</div>
				}
		</div>
	);
};

export default ModelBanner;
