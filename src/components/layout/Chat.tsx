import { useAuth } from '@/contexts/AuthContext';
import { ChatState } from '@/lib/enums';
import { RootState } from '@/store/store';
import React from 'react'
import { useSelector } from 'react-redux';
import NewChatInterface from '../melody/NewChatInterface/NewChatInterface';
import ChatInterface from '../melody/interface/ChatInterface';

const Chat = () => {
    const { isAuthenticated } = useAuth();
    const chatState = useSelector((state: RootState) => state.melody.chatState);
    return (
        <div className="flex w-full h-full items-center justify-center">
            {
                (!isAuthenticated || chatState === ChatState.NEW_CHAT)
                    ?
                    <NewChatInterface />
                    :
                    <ChatInterface />
            }
        </div>
    )
}

export default Chat