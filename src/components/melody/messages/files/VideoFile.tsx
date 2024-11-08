import React from 'react';

interface VideoFileProps {
    uri: string;
}

const VideoFile: React.FC<VideoFileProps> = ({ uri }) => {
    return (
        <div className={`relative w-96 p-2 h-80 object-contain bg-white bg-opacity-15 rounded-2xl`}>
            <video controls style={{ width: '100%' }}>
                <source src={uri} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoFile;