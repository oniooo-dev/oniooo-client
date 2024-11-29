import ConversationBanner from "./ConversationBanner";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChatSocket } from "@/contexts/ChatSocketContext";

const ConversationSelectionPanel = () => {

	// Contexts
	const { isAuthenticated } = useAuth();
	const { fetchChats, chats } = useChatSocket();

	useEffect(() => {
		// Fetch the conversations
		if (isAuthenticated) {
			console.log('Fetching chats ...')
			fetchChats();
		}
	}, [isAuthenticated]);

	return (
		<ul className="flex flex-col w-[240px] h-full py-2 gap-2 hide-scrollbar overflow-y-auto">
			{
				isAuthenticated ?
					(
						<div className="flex flex-col w-full">
							<p className="text-[14px] font-[400] text-white text-opacity-60 mt-4 ml-4 mb-1">
								History
							</p>
							{
								chats.map(
									(chat, index) => {
										return (
											<li key={index}>
												<ConversationBanner chatId={chat.chat_id} title={chat.title} />
											</li>
										);
									}
								)
							}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center w-full h-full gap-2">
							<p className="text-[#f2f2f2] text-opacity-100">{`U ain't logged in!`}</p>
						</div>
					)
			}
		</ul>
	);
};

export default ConversationSelectionPanel;
