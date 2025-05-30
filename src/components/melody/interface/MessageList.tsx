import React, { useEffect, useRef } from "react";
import ConversationMessage from "../messages/ConversationMessage";
import { useChatSocket } from "@/contexts/ChatSocketContext";
import { useAuth } from "@/contexts/AuthContext";

interface MessageListProps {
	messagesContainerRef: React.RefObject<HTMLDivElement>
	setShowScrollButton: React.Dispatch<React.SetStateAction<boolean>>
	scrollToBottom: () => void;
	files: File[];	/* Refactor this really bad code */
}

const MessageList: React.FC<MessageListProps> = ({ messagesContainerRef, setShowScrollButton, scrollToBottom, files }) => {

	// Auth
	const { user } = useAuth();

	// Chat socket
	const { messages, selectedChatId, melodyState } = useChatSocket();

	// Melody icon URL
	const userIconUrl = "/icons/messages/user_pfp.png";
	const melodyIconUrl = "/icons/messages/melody_pfp.png";

	// Scroll to bottom ref
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const checkScroll = () => {

		// Container
		const container = messagesContainerRef.current;

		// Check if the container exists
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
	}, [messages]);

	const isUserMessage = (type: string) => type.includes("USER");
	const getMessageSender = (type: string) => (isUserMessage(type) ? "USER" : "SYSTEM");

	// Switch statement for melodyState rendering
	const renderMelodyState = () => {
		switch (melodyState) {
			case "THINKING":
				return (
					<div className={`flex flex-row gap-4`}>
						<img src={melodyIconUrl} className="w-9 h-9 rounded-full" />
						<p className="text-md text-opacity-60 mt-2">Staring into the abyss ...</p>
					</div>
				);
			case "CREATING":
				return (
					<div className={`flex flex-row gap-4`}>
						<img src={melodyIconUrl} className="w-9 h-9 rounded-full" />
						<p className="text-md text-opacity-60 mt-2">Creating ...</p>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div ref={messagesContainerRef} className="relative flex flex-col w-full h-full gap-6 pt-36 overflow-y-scroll hide-scrollbar">
			{
				selectedChatId === null ?
					(
						<div className="flex w-full h-full items-center justify-center">
							<div className="flex items-center justify-center bg-white bg-opacity-[0.12] rounded-full p-6 mt-12">
								<img src="/icons/main-logo/oniooo-small.png" className="w-[76px] h-[76px] mt-[4px]" />
							</div>
						</div>
					) : (
						messages.map((message, index) => {
							const isUser = message.type === "USER_TEXT" || message.type === "USER_FILE";
							const showIcon = index === 0 || getMessageSender(messages[index - 1].type) !== getMessageSender(message.type);
							return (
								<div key={index} className={`flex ${isUser ? 'justify-end' : ''} gap-4 w-full ${isUser ? 'pl-24' : 'pr-24'} text-[16px]`}>
									{isUser ? (
										<>
											<ConversationMessage type={message.type} content={message.content} />
											{!showIcon && <div className="w-9"></div>}
											{showIcon && <img src={userIconUrl || melodyIconUrl} className="w-9 h-9 rounded-full mt-3 " />}
										</>
									) : (
										<>
											{message.content !== "" && (
												<>
													{showIcon && <img src={melodyIconUrl} className="w-9 h-9 rounded-full mt-3 -scale-x-100" />}
													{!showIcon && <div className="w-9"></div>}
													<ConversationMessage type={message.type} content={message.content} />
												</>
											)}
										</>
									)}
								</div>
							);
						})
					)
			}

			{renderMelodyState()}

			{/* Scroll to bottom ref */}
			<div className="h-10" ref={messagesEndRef} />

			{
				files && files.length > 0 ?
					<div className="mb-60"></div> :
					<div></div>
			}
		</div>
	);
};

export default MessageList;