import React from 'react';

interface VideoFileProps {
    uri: string;
}

const VideoFile: React.FC<VideoFileProps> = ({ uri }) => {
    return (
        <div className={`relative p-2 h-72 a-auto object-contain bg-white bg-opacity-15 rounded-2xl`} style={{ maxWidth: '100%' }}>
            <video className="rounded-xl" controls style={{ width: '100%' }}>
                <source src={uri} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoFile;