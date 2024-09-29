import { useChatSocket } from '@/contexts/ChatSocketContext';
import { selectChat } from '@/store/features/melody/melodySlice';
import { createChat } from '@/store/features/melody/melodyThunks';
import { useAppDispatch } from '@/store/useAppDispatch';
import React, { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from 'react';

const NewChatTextArea: React.FC = () => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Context Provider
    const { sendMessage } = useChatSocket();

    const handleSend = (): void => {
        if (inputValue.trim()) {
            // Create a new chat
            dispatch(selectChat({ chatId: "" })); // Deselect the chat
            dispatch(createChat({ firstPrompt: inputValue }));
            sendMessage(inputValue);
            setInputValue(''); // Clear the input after sending
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default to avoid newline in input
            handleSend();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setInputValue(e.target.value);
        adjustHeight();
    };

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        const minHeight = lineHeight; // Single line height
        const maxHeight = lineHeight * 20; // 5 lines maximum, adjust as needed

        // Reset height to min-height to accurately calculate scrollHeight
        textarea.style.height = `${minHeight}px`;

        const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
        textarea.style.height = `${newHeight}px`;

        // Add scrollbar if content exceeds maxHeight
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    };

    useEffect(() => {
        adjustHeight();
    }, []);

    return (
        <div className="relative flex items-center justify-center w-full h-fit pr-2 rounded-3xl bg-gradient-to-r from-red-400 via-purple-400 via-pink-300 to-cyan-500 text-white opacity-80">
            {/* Blended background */}
            <div className="absolute inset-0 m-[2px] rounded-3xl bg-black bg-opacity-90" />

            {/* Content container */}
            <div className="relative flex items-center justify-center w-full h-full px-5 py-4 rounded-full">
                <div className="flex flex-row w-full gap-3">
                    <img
                        src="/icons/melody/paperclip.png"
                        className="w-[22px] h-[22px] mt-1 cursor-pointer object-contain scale-x-[-1] rotate-45"
                        alt="Paperclip"
                    />
                    <textarea
                        ref={textareaRef}
                        className="flex items-center justify-center w-full h-full bg-transparent border-none ring-0 outline-none 
                                 text-white placeholder-white/80 resize-none hide-scrollbar"
                        style={{
                            minHeight: 'calc(1em + 15px)', // Adjust based on your font size and padding
                            lineHeight: '2', // Adjust as needed
                        }}
                        placeholder="Try images, videos, music, literature, science, casual chats ..., casual chats ..., casual chats ..."
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewChatTextArea;