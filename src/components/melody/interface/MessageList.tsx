import React, { useEffect, useRef, useState } from "react";
import ConversationMessage from "../messages/ConversationMessage";
import { useChatSocket } from "@/contexts/ChatSocketContext";
import { useAuth } from "@/contexts/AuthContext";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ChatState } from "@/lib/enums";

interface MessageListProps {
	messagesContainerRef: React.RefObject<HTMLDivElement>
	setShowScrollButton: React.Dispatch<React.SetStateAction<boolean>>
	scrollToBottom: () => void;
	files: File[];	/* Refactor this really bad code */
}

const MessageList: React.FC<MessageListProps> = ({ messagesContainerRef, setShowScrollButton, scrollToBottom, files }) => {

	// ...
	const { user } = useAuth();
	const { messages, waitingForMessageState } = useChatSocket();
	const chatState = useSelector((state: RootState) => state.melody.chatState);

	// Stuff ...
	const melodyIconUrl = "https://tr.rbxcdn.com/196d20775e64758b25c76b4b2e470d89/420/420/Hat/Webp";
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const checkScroll = () => {
		const container = messagesContainerRef.current;
		if (container) {
			// Check if the scroll is within 1px of the bottom
			const isScrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
			setShowScrollButton(!isScrolledToBottom);
		}
	};

	useEffect(() => {
		const handleResize = () => checkScroll();
		const handleScroll = () => checkScroll();

		scrollToBottom();  // Ensure we start at the bottom on initial load
		checkScroll();     // Initial check to set the visibility of the button

		messagesContainerRef.current?.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);

		return () => {
			messagesContainerRef.current?.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, [messages, waitingForMessageState]);

	const mapWaitingStateToMessage = (state: string) => {
		if (state === "TYPING") {
			return "...";
		}
		else if (state === "GENERATING_IMAGE") {
			return "Generating an image for you"
		}
		else if (state === "GENERATING_VIDEO") {
			return "Generating a video for you"
		}
		else {
			return "Loading ..."
		}
	}

	const isUserMessage = (type: string) => type.includes("USER");
	const getMessageSender = (type: string) => (isUserMessage(type) ? "USER" : "SYSTEM");

	return (
		<div ref={messagesContainerRef} className="relative flex flex-col w-full h-full gap-6 pt-36 overflow-y-scroll hide-scrollbar">
			{chatState === ChatState.NEW_CHAT ? (
				<div className="absolute flex w-full h-full items-center justify-center">
					<img src="/images/welcome-oniooo.png" className="w-[50%]" />
				</div>
			) : (
				messages.map((message, index) => {
					const isUser = message.type === "USER_TEXT" || message.type === "USER_FILE";
					const showIcon = index === 0 || getMessageSender(messages[index - 1].type) !== getMessageSender(message.type);
					return (
						<div key={index} className={`flex ${isUser ? 'justify-end' : ''} gap-4 w-full ${isUser ? 'pl-48' : 'pr-48'}`}>
							{isUser ? (
								<>
									<ConversationMessage type={message.type} content={message.content} />
									{!showIcon && <div className="w-9"></div>}
									{showIcon && <img src={user?.iconUrl || melodyIconUrl} className="w-9 h-9 rounded-full mt-3" />}
								</>
							) : (
								<>
									{showIcon && <img src={melodyIconUrl} className="w-9 h-9 rounded-full mt-3" />}
									{!showIcon && <div className="w-9"></div>}
									<ConversationMessage type={message.type} content={message.content} />
								</>
							)}
						</div>
					);
				})
			)}
			{
				waitingForMessageState &&
				(
					<div className="flex flex-row items-center gap-4">
						<img src={melodyIconUrl} className="w-9 h-9 rounded-full" />
						<p>
							{
								mapWaitingStateToMessage(waitingForMessageState)
							}
						</p>
					</div>
				)
			}
			<div ref={messagesEndRef} /> {/* Scroll to bottom ref */}
			{
				files && files.length > 0 ?
					<div className="mb-60"></div> :
					<div></div>
			}
		</div>
	);
};

export default MessageList;