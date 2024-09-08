import { ChatState } from "@/lib/enums";
import { startNewMelodyChat } from "@/store/features/melody/melodySlice";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/useAppDispatch";
import { useSelector } from "react-redux";

const MelodyProfileBanner = () => {
	const dispatch = useAppDispatch();
	const friendWhoIsThere = useSelector((state: RootState) => state.melody.friendWhoIsThere);
	const chatState = useSelector((state: RootState) => state.melody.chatState);
	const handleNewChatClick = () => {
		dispatch(startNewMelodyChat());
	};
	return (
		<div
			className={`relative flex flex-row items-center justify-between w-full px-[12px] py-[10px] 
						rounded-[10px] bg-white ${friendWhoIsThere === "MELODY" ? `bg-opacity-10` : `bg-opacity-0 hover:bg-opacity-10`} 
						cursor-pointer duration-500`}
			onClick={handleNewChatClick}
		>
			<div className="flex flex-row items-center gap-3">
				<div className="w-[36px] h-[36px] rounded-full">
					<img
						src="https://png.pngtree.com/png-clipart/20231121/original/pngtree-cute-turtle-cartoon-illustration-vector-png-image_13676293.png"
						className="w-full h-full rounded-full"
					/>
				</div>
				<div className="flex flex-col h-full">
					<p className="text-white text-nowrap text-md">Melody</p>
				</div>
			</div>
			<div
				className={`absolute right-3 p-2 cursor-pointer rounded-lg bg-white bg-opacity-0 duration-500 ${friendWhoIsThere === "MELODY" && chatState === ChatState.NEW_CHAT ? "bg-opacity-[0.15]" : "hover:bg-opacity-[0.15]"}`}
				onClick={handleNewChatClick}
			>
				<img src="/icons/melody/new-chat.png" className="w-4 h-4" />
			</div>
		</div>
	);
};

export default MelodyProfileBanner;
