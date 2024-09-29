import React from 'react'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useAppDispatch } from '@/store/useAppDispatch';
import { startNewMelodyChat } from '@/store/features/melody/melodySlice';
import NewChatButton from '../interface/NewChatButton';
import ConversationSelectionPanel from './conversations/ConversationSelectionPanel';

const LeftPanel = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleNewChat = () => {
        dispatch(startNewMelodyChat());
    };

    const handleMochiClick = () => {
        router.push("/mochi");
    };

    return (
        <div className="flex flex-col gap-3 w-fit h-full pl-4 py-4">
            <div className="relative flex flex-col w-fit h-full gap-2 p-2 rounded-2xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
                <NewChatButton onClick={handleNewChat} />
                <ConversationSelectionPanel />
            </div>
            <div
                className="flex items-center justify-between w-full py-3 px-5 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg
                           rounded-2xl cursor-pointer hover:opacity-60 duration-500"
                onClick={handleMochiClick}
            >
                <div className="flex flex-row items-center gap-3">
                    <img src="/icons/main-logo/oniooo-small.png" className="w-[22px] h-[22px]" alt="Mochi" />
                    <p className="text-[14px] font-normal mt-[1px]">{user ? user.mochi_balance : 3296832968}</p>
                </div>
            </div>
        </div>
    )
}

export default LeftPanel