import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationBanner from "./ConversationBanner";
import { useEffect } from "react";
import { fetchUserConversations } from "@/store/features/melody/melodyThunks";

const ConversationSelectionPanel = () => {
	const dispatch = useAppDispatch();
	const conversations = useSelector((state: RootState) => state.melody.conversationHistory);

	useEffect(() => {
		// Fetch the conversations
		dispatch(fetchUserConversations());
	}, [dispatch]);

	return (
		<div className="flex flex-col w-full gap-2">
			{conversations.map((conversation, index) => (
				<div key={index}>
					<ConversationBanner conversationId={conversation.conversation_id} modelId={conversation.model_id} title={conversation.title} />
				</div>
			))}
		</div>
	);
};

export default ConversationSelectionPanel;
