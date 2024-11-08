import React from 'react';

interface VideoFileProps {
    uri: string;
}

const VideoFile: React.FC<VideoFileProps> = ({ uri }) => {
    return (
        <div className="video-container" style={{ maxWidth: '100%' }}>
            <video controls style={{ width: '100%' }}>
                <source src={uri} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoFile;