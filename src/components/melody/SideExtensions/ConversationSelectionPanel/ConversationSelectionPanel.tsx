import { fetchConversationHistory } from "@/store/features/melody/melodyThunks";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ConversationBanner from "./ConversationBanner";

const ConversationSelectionPanel = () => {
	const dispatch = useAppDispatch();
	const conversations = useSelector((state: RootState) => state.melody.conversationHistory);

	useEffect(() => {
		dispatch(fetchConversationHistory());
	}, [dispatch]);

	return (
		<div className="flex flex-col w-full gap-2">
			{conversations.map((conversation, index) => (
				<div key={index}>
					<ConversationBanner conversationId={conversation.id} title={conversation.title} />
				</div>
			))}
		</div>
	);
};

export default ConversationSelectionPanel;
