import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ModelProfileBanner = () => {
	const modelId = useSelector((state: RootState) => state.melody.selectedModelId);
	return (
		<div className="flex flex-row items-center justify-between px-[20px] py-[24px]">
			<div className="flex flex-row items-center gap-4">
				<div className="w-16 h-16 bg-white rounded-full"></div>
				<div className="flex flex-col h-full">
					<p className="text-white">{modelId}</p>
					<p>By Oniooo</p>
				</div>
			</div>
			<div className="ml-3">
				<img
					src={
						"https://cdn-icons-png.flaticon.com/512/1860/1860115.png"
					}
					className="w-4 h-4 filter invert"
				/>
			</div>
		</div>
	);
};

export default ModelProfileBanner;
