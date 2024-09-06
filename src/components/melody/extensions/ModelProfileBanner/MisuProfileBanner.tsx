import { ChatState } from "@/lib/enums";
import { startNewMisuChat } from "@/store/features/melody/melodySlice";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/useAppDispatch";
import { useSelector } from "react-redux";

const MisuProfileBanner = () => {
	const dispatch = useAppDispatch();
	const friendWhoIsThere = useSelector((state: RootState) => state.melody.friendWhoIsThere);
	const chatState = useSelector((state: RootState) => state.melody.chatState);
	const handleNewChatClick = () => {
		dispatch(startNewMisuChat());
	};
	return (
		<div
			className={`relative flex flex-row items-center justify-between w-full px-[8px] py-[10px] 
			rounded-[10px] bg-white ${friendWhoIsThere === "MISU" ? `bg-opacity-10` : `bg-opacity-0 hover:bg-opacity-10`} 
			cursor-pointer duration-500`}
			onClick={handleNewChatClick}
		>
			<div className="flex flex-row items-center gap-3">
				<div className="w-[48px] h-[48px] rounded-full">
					<img
						src="https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg"
						className="w-full h-full rounded-full"
					/>
				</div>
				<div className="flex flex-col h-full">
					<p className="text-white text-nowrap">Misu</p>
				</div>
			</div>
			<div
				className={`absolute right-3 p-2 cursor-pointer rounded-lg bg-white bg-opacity-0 ${friendWhoIsThere === "MISU" && chatState === ChatState.NEW_CHAT ? "bg-opacity-[0.15]" : "hover:bg-opacity-[0.15]"} duration-500`}
				onClick={handleNewChatClick}
			>
				<img src="/icons/melody/new-chat.png" className="w-4 h-4" />
			</div>
		</div>
	);
};

export default MisuProfileBanner;
