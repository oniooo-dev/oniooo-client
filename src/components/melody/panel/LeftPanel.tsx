import React from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/useAppDispatch';
import { startNewMelodyChat } from '@/store/features/melody/melodySlice';
import ConversationSelectionPanel from './conversations/ConversationSelectionPanel';
import NewChat from './NewChat';
import MochiBalance from './MochiBalance';

const LeftPanel = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleNewChat = (modelName: ModelName) => {
        dispatch(startNewMelodyChat({ modelName }));
    };

    const handleMochiClick = () => {
        router.push("/shop");
    };

    return (
        <div className="flex flex-col w-fit h-full p-2 rounded-[20px] bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
            <NewChat onClick={handleNewChat} />
            <ConversationSelectionPanel />
            <MochiBalance onClick={handleMochiClick} />
        </div>
    )
}

export default LeftPanel;