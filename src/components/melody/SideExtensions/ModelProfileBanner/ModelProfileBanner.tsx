import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ModelProfileBanner = () => {
	const currentSelectedModel = useSelector((state: RootState) => state.melody.currentSelectedModel)?.ai_model;

	if (!currentSelectedModel) {
		// Draw sketelon loader
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-row items-center justify-between w-full px-[16px] py-[24px]">
			<div className="flex flex-row items-center gap-3">
				<div className="w-10 h-10 rounded-full">
					<img src={currentSelectedModel.icon_url} className="w-full h-full rounded-full" />
				</div>
				<div className="flex flex-col h-full">
					<p className="text-white text-nowrap">{currentSelectedModel.name}</p>
					<p className="text-xs text-white text-opacity-80 text-nowrap">{currentSelectedModel.short_description}</p>
				</div>
			</div>
			<div className="p-2 cursor-pointer rounded-full bg-white bg-opacity-0 hover:bg-opacity-20">
				<img src="/icons/melody/new-chat.png" className="w-5 h-5" />
			</div>
		</div>
	);
};

export default ModelProfileBanner;
