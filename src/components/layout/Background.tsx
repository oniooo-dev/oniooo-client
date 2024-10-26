import { ChatState } from '@/lib/enums';
import { RootState } from '@/store/store';
import React from 'react'
import { useSelector } from 'react-redux';
import VideoBackground from '../background/VideoBackground';
import EpicBackground from '../background/EpicBackground';

const Background = () => {
    const chatState = useSelector((state: RootState) => state.melody.chatState);
    return (
        <>
            {
                chatState === ChatState.NEW_CHAT
                    ?
                    <VideoBackground />
                    :
                    <EpicBackground />
            }
        </>
    )
}

export default Background