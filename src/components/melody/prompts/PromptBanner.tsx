import { createChat } from "@/store/features/melody/melodyThunks";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/useAppDispatch";
import React from "react";
import { useSelector } from "react-redux";

interface PromptBannerProps {
	title: string;
	subtitle: string;
	prompt: string;
	onClose: () => void;
}

const PromptBanner: React.FC<PromptBannerProps> = ({ title, subtitle, prompt, onClose }) => {
	const dispatch = useAppDispatch();
	const friendWhoIsThere = useSelector((state: RootState) => state.melody.friendWhoIsThere);
	const handleClick = () => {
		dispatch(createChat({ friend: friendWhoIsThere, firstPrompt: prompt }));
		onClose();
	};
	return (
		<div
			className="flex flex-col w-full rounded-xl px-4 py-3 bg-black bg-opacity-40 hover:opacity-60 cursor-pointer duration-500"
			onClick={handleClick}
		>
			<p className="text-sm">{title}</p>
			<p className="text-sm text-white text-opacity-50">{subtitle}</p>
		</div>
	);
};

export default PromptBanner;
