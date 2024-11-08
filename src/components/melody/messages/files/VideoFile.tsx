import React from 'react';

interface VideoFileProps {
    uri: string;
}

const VideoFile: React.FC<VideoFileProps> = ({ uri }) => {
    return (
        <div
            className={`relative p-2 h-72 max-w-full bg-white bg-opacity-15 rounded-2xl overflow-hidden`}
            style={{ maxWidth: '100%' }}
        >
            <video
                className="rounded-xl w-full h-full object-contain"
                controls
                style={{ width: '100%', height: '100%' }}
            >
                <source src={uri} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoFile;