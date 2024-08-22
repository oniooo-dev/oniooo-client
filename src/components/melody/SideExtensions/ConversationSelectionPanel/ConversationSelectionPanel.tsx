import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationBanner from "./ConversationBanner";
import { useEffect } from "react";
import { fetchUserConversations } from "@/store/features/melody/melodyThunks";

const ConversationSelectionPanel = () => {
	const dispatch = useAppDispatch();
	const loading = useSelector((state: RootState) => state.melody.loading);
	const conversations = useSelector((state: RootState) => state.melody.conversationHistory);

	useEffect(() => {
		// Fetch the conversations
		dispatch(fetchUserConversations());
	}, [dispatch]);

	if (loading && !conversations) {
		return (
			<>
				{[...Array(20)].map((_, index) => (
					<div key={index} className="animate-pulse relative flex flex-row w-[260px] h-10 rounded-lg bg-white bg-opacity-10"></div>
				))}
			</>
		);
	}

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
