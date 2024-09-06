import { startNewMelodyChat, startNewMisuChat } from "@/store/features/melody/melodySlice";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/useAppDispatch";
import React from "react";
import { useSelector } from "react-redux";

const ChatHeader = () => {
	const dispatch = useAppDispatch();
	const friendWhoIsThere = useSelector((state: RootState) => state.melody.friendWhoIsThere);
	const handleClick = () => {
		if (friendWhoIsThere === "MELODY") {
			dispatch(startNewMisuChat());
		} else {
			dispatch(startNewMelodyChat());
		}
	};
	return (
		<div className="flex-vertical w-full items-center justify-center mt-16 gap-2 mb-8">
			<div>
				<div
					className="w-16 h-16 object-contain rounded-full hover:scale-[1.05] duration-500 cursor-pointer"
					onClick={handleClick}
				>
					{friendWhoIsThere === "MELODY" ? (
						<img
							src="https://preview.redd.it/cute-cartoon-kitten-v0-ji81au16fz2b1.png?auto=webp&s=950b18abd27a29d38b5910cbad16f47ae6aa27ba"
							className="w-16 h-16 rounded-full"
						/>
					) : (
						<img
							src="https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg"
							className="w-16 h-16 rounded-full"
						/>
					)}
				</div>
			</div>
			{/* <div className="flex flex-col items-center w-full gap-1">
				<p className="font-medium text-xl">Melody</p>
			</div> */}
		</div>
	);
};

export default ChatHeader;
