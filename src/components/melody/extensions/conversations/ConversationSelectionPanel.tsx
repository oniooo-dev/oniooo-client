import { useAppDispatch } from "@/store/useAppDispatch";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationBanner from "./ConversationBanner";
import { useEffect } from "react";
import { fetchChats } from "@/store/features/melody/melodyThunks";

const ConversationSelectionPanel = () => {
	const dispatch = useAppDispatch();
	const chats = useSelector((state: RootState) => state.melody.chats);
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	useEffect(() => {
		// Fetch the conversations
		dispatch(fetchChats());
	}, [dispatch]);
	return (
		<ul className="flex flex-col h-full gap-1 hide-scrollbar" style={{ overflowY: "auto", overflowX: "visible" }}>
			{isAuthenticated ? (
				chats.map((chat, index) => {
					return (
						<li key={index}>
							<ConversationBanner chatId={chat.chat_id} friend={chat.friend} title={chat.title} />
						</li>
					);
				})
			) : (
				<div className="flex flex-col items-center justify-center w-[260px] h-full gap-2">
					<img
						src="https://play-lh.googleusercontent.com/Yl_DmFMJrR7cLUqDd9A2OpevA-5dwbCDQkyxNOGUb0HwVykaxXxpHR8qFsDEJHuQDA8"
						className="w-[100px] h-[100px]"
					/>
					<p className="text-white text-opacity-100">U ain't logged in!</p>
				</div>
			)}
		</ul>
	);
};

export default ConversationSelectionPanel;
