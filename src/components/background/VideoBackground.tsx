import React from 'react'

const VideoBackground = () => {
    return (
        <video
            src="/videos/new_chat_video.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ zIndex: -1 }}
            autoPlay
            loop
        />
    )
}

export default VideoBackground