import { CSText } from "@/lib/types";
import React, { useRef, useEffect, useState } from "react";
import CustomerServiceTextBox from "./CustomerServiceTextBox";
import CustomerServiceText from "./CustomerServiceText";
import { useCustomizeBackground } from "@/contexts/CustomizeBackgroundContext";

interface CustomerServiceInterfaceProps {
	onClose: () => void;
}

const CustomerServiceInterface: React.FC<CustomerServiceInterfaceProps> = ({ onClose }) => {
	const { backgroundImage } = useCustomizeBackground();
	const [prompt, setPrompt] = useState<string>("");
	const [messages, setMessages] = useState<CSText[]>([]);

	const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPrompt(event.target.value);
	};

	const addMessage = () => {
		const newMessage: CSText = {
			type: "USER",
			content: prompt,
		};
		setPrompt("");
		setMessages((prev) => [...prev, newMessage]);
	};

	const modalRef = useRef<HTMLDivElement>(null);
	const messageContainerRef = useRef<HTMLDivElement>(null);

	const handleClose = () => {
		onClose();
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			handleClose();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (messageContainerRef.current) {
			messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div
			className="flex flex-col items-center pt-8 pb-2 w-1/2 h-5/6 p-2 bg-white bg-opacity-20 rounded-xl cursor-default text-white"
			ref={modalRef}
		>
			<img
				src={backgroundImage}
				className="absolute top-0 left-0 w-screen h-screen object-cover opacity-40"
				style={{ zIndex: -1 }}
			/>
			<p className="text-3xl font-semibold">PAIMON</p>
			<div
				className="flex flex-col w-full h-full items-center px-4 py-4 gap-2 overflow-y-auto"
				ref={messageContainerRef}
			>
				{messages.map((message, index) => (
					<div key={index} className="flex flex-row w-full">
						<CustomerServiceText text={message} />
					</div>
				))}
			</div>
			<div className="w-full mt-2">
				<CustomerServiceTextBox onSend={addMessage} prompt={prompt} onChange={handlePromptChange} />
			</div>
		</div>
	);
};

export default CustomerServiceInterface;
