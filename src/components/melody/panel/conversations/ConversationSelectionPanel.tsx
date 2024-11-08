import { useAppDispatch } from "@/store/useAppDispatch";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationBanner from "./ConversationBanner";
import { useEffect } from "react";
import { fetchChats } from "@/store/features/melody/melodyThunks";
import { useAuth } from "@/contexts/AuthContext";

const ConversationSelectionPanel = () => {
	const dispatch = useAppDispatch();
	const chats = useSelector((state: RootState) => state.melody.chats);
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		// Fetch the conversations
		if (isAuthenticated) {
			console.log('Fetching chats ...')
			dispatch(fetchChats());
		}
	}, [dispatch, isAuthenticated]);

	return (
		<ul className="flex flex-col w-[240px] h-full py-2 gap-2 hide-scrollbar overflow-y-auto">
			{isAuthenticated ? (
				chats.map((chat, index) => {
					return (
						<li key={index}>
							<ConversationBanner chatId={chat.chat_id} title={chat.title} />
						</li>
					);
				})
			) : (
				<div className="flex flex-col items-center justify-center w-full h-full gap-2">
					<img
						src="https://play-lh.googleusercontent.com/Yl_DmFMJrR7cLUqDd9A2OpevA-5dwbCDQkyxNOGUb0HwVykaxXxpHR8qFsDEJHuQDA8"
						className="w-[100px] h-[100px]"
					/>
					<p className="text-[#f2f2f2] text-opacity-100">{`U ain't logged in!`}</p>
				</div>
			)}
		</ul>
	);
};

export default ConversationSelectionPanel;
