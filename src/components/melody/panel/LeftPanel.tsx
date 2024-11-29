import React from 'react'
import { useRouter } from 'next/navigation';
import ConversationSelectionPanel from './conversations/ConversationSelectionPanel';
import NewChat from './NewChat';
import MochiBalance from './MochiBalance';

const LeftPanel = () => {

    const router = useRouter();

    const handleMochiClick = () => {
        router.push("/shop");
    };

    return (
        <div className="flex flex-col w-fit h-full p-2 rounded-[20px] bg-white bg-opacity-[0.12] backdrop-filter backdrop-blur-lg">
            <NewChat />
            <ConversationSelectionPanel />
            <MochiBalance onClick={handleMochiClick} />
        </div>
    )
}

export default LeftPanel;