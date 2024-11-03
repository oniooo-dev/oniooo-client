import React from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/useAppDispatch';
import { startNewMelodyChat } from '@/store/features/melody/melodySlice';
import ConversationSelectionPanel from './conversations/ConversationSelectionPanel';
import { useAuth } from '@/contexts/AuthContext';
import ChooseModel from './ChooseModel';

const LeftPanel = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useAuth();

    const handleNewChat = (modelName: ModelName) => {
        dispatch(startNewMelodyChat({ modelName }));
    };

    const handleMochiClick = () => {
        router.push("/mochi");
    };

    return (
        <div className="flex flex-col gap-3 w-fit h-full">
            <div className="flex flex-col w-full h-full gap-2 p-2 rounded-2xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
                <ChooseModel onClick={handleNewChat} />
                <ConversationSelectionPanel />
            </div>
            <div
                className="flex items-center justify-between w-full py-3 px-5 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg
                           rounded-2xl cursor-pointer hover:opacity-60 duration-500"
                onClick={handleMochiClick}
            >
                <div className="flex flex-row items-center gap-3">
                    <img src="/icons/main-logo/oniooo-small.png" className="w-[22px] h-[22px]" alt="Mochi" />
                    <p className="text-[14px] font-normal mt-[1px]">
                        {
                            user ?
                                user.mochiBalance :
                                3296832968
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LeftPanel