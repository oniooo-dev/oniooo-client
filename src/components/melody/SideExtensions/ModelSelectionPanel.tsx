import React, { useEffect } from "react";
import ModelIcon from "../other/ModelIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/hooks";
import { fetchSavedAIModels } from "@/store/features/melody/melodyThunks";

const ModelSelectionPanel = () => {
	const dispatch = useAppDispatch();
	const savedModels = useSelector((state: RootState) => state.melody.savedModels);

	useEffect(() => {
		dispatch(fetchSavedAIModels());
	}, [dispatch]);
	return (
		<div className="grid grid-cols-3 gap-2">
			{savedModels.map((model, index) => (
				<div key={index}>
					<ModelIcon modelIcon={model.iconUrl} />
				</div>
			))}
		</div>
	);
};

export default ModelSelectionPanel;
