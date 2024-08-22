import { selectModelById } from "@/store/features/melody/melodySlice";
import { fetchModelBasicDetails } from "@/store/features/melody/melodyThunks";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ModelProfileBanner = () => {
	const dispatch = useAppDispatch();
	const selectedModelId = useSelector((state: RootState) => state.melody.selectedModelId);
	const currentSelectedModel = useSelector((state: RootState) => state.melody.currentSelectedModel)?.ai_model;

	useEffect(() => {
		dispatch(fetchModelBasicDetails({ modelId: selectedModelId }));
	})

	if (!currentSelectedModel) {
		// Draw sketelon loader
		return (
			<div className="flex flex-row items-center justify-between w-full px-[16px] py-[24px]">
				<div className="flex flex-row items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-white bg-opacity-50 animate-pulse"></div>
					<div className="flex flex-col h-full">
						<div className="w-32 h-4 bg-white bg-opacity-60 rounded animate-pulse"></div>
						<div className="w-24 h-3 bg-white bg-opacity-50 rounded mt-2 animate-pulse"></div>
					</div>
				</div>
				{/* <div className="p-2 cursor-pointer rounded-full bg-gray-300 animate-pulse">
					<div className="w-5 h-5 opacity-0"></div> Hidden icon representation
				</div> */}
			</div>
		)
	}

	const handleNewChatClick = () => {
		console.log("New chat");
		dispatch(selectModelById(currentSelectedModel.model_id));
	}

	return (
		<div className="flex flex-row items-center justify-between w-full px-[20px] py-[24px]">
			<div className="flex flex-row items-center gap-3">
				<div className="w-10 h-10 rounded-full">
					<img src={currentSelectedModel.icon_url} className="w-full h-full rounded-full" />
				</div>
				<div className="flex flex-col h-full">
					<p className="text-white text-nowrap">{currentSelectedModel.name}</p>
					<p className="text-xs text-white text-opacity-80 text-nowrap">{currentSelectedModel.short_description}</p>
				</div>
			</div>
			<div className="p-2 cursor-pointer rounded-lg bg-white bg-opacity-20 hover:bg-opacity-[0.15]"
				onClick={() => handleNewChatClick()}
			>
				<img src="/icons/melody/new-chat.png" className="w-4 h-4" />
			</div>
		</div>
	);
};

export default ModelProfileBanner;
