import { fetchUserModelOwnerships } from "@/store/features/melody/melodyThunks";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ModelBanner from "./ModelBanner";

const ModelSelectionPanel = () => {
	const dispatch = useAppDispatch();
	const userOwnedModels = useSelector((state: RootState) => state.melody.savedModels);

	useEffect(() => {
		dispatch(fetchUserModelOwnerships());
	}, [dispatch]);

	return (
		<div className="flex flex-col gap-2">
			{userOwnedModels.map((model, index) => (
				<div key={index}>
					<ModelBanner
						modelId={model.ai_model.model_id}
						iconUrl={model.ai_model.icon_url}
						modelName={model.ai_model.name}
					/>
				</div>
			))}
		</div>
	);
};

export default ModelSelectionPanel;
