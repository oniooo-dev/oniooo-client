import React, { useEffect, useState } from "react";
import UnsignedChatInputBox from "./UnsignedChatInputBox/UnsignedChatInputBox";
import UnsignedMessageList from "./UnsignedMessageList";
import { UNAUTH_MELODY_MODEL_ID } from "@/lib/constants";
import { useAppDispatch } from "@/store/hooks";
import { selectModelById } from "@/store/features/melody/melodySlice";
import { fetchModelBasicDetails } from "@/store/features/melody/melodyThunks";
import { DaoYouMessage } from "@/lib/types";
import Navbar from "@/components/Navbar/Navbar";

const UnsignedChatInterface = () => {
	const initialMessage: DaoYouMessage = {
		iconUrl: "https://static1.xdaimages.com/wordpress/wp-content/uploads/2024/02/google-gemini-ai-icon.png",
		senderType: "system",
		senderName: "Melody",
		content: "Hello, human!",
	};

	const dispatch = useAppDispatch();
	const [messages, setMessages] = useState<DaoYouMessage[]>([initialMessage]);

	const handleSendMessage = (message: DaoYouMessage) => {
		setMessages([...messages, message]);
		// if user authenticates, send conversation to server
	};

	useEffect(() => {
		dispatch(selectModelById(UNAUTH_MELODY_MODEL_ID));
		dispatch(fetchModelBasicDetails({ modelId: UNAUTH_MELODY_MODEL_ID }));
	}, []);
	  
	return (
		<div className="flex flex-col w-full h-full items-center">
			<div className="absolute top-0 left-0 w-full h-full p-2">
				<Navbar />
			</div>
			<div className="flex flex-col w-[90%] lg:w-[60%] h-full">
				<UnsignedMessageList messages={messages} />
				<div className="w-[100%] mb-9">
					<UnsignedChatInputBox />
				</div>
			</div>
		</div>
	);
};

export default UnsignedChatInterface;
