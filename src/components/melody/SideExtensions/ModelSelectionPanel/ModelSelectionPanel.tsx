import { fetchSavedAIModels } from "@/store/features/melody/melodyThunks";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ModelBanner from "./ModelBanner";

const ModelSelectionPanel = () => {
	const dispatch = useAppDispatch();
	const savedModels = useSelector((state: RootState) => state.melody.savedModels);

	useEffect(() => {
		dispatch(fetchSavedAIModels());
	}, [dispatch]);

	return (
		<div className="flex flex-col gap-2">
			{savedModels.map((model, index) => (
				<div key={index}>
					<ModelBanner modelId={model.id} iconUrl={model.iconUrl} modelName={model.modelName} />
				</div>
			))}
		</div>
	);
};

export default ModelSelectionPanel;
