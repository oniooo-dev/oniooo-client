import React from 'react'

interface AudioFileProps {
    uri: string
}

const AudioFile: React.FC<AudioFileProps> = ({ uri }) => {
    return (
        <audio src={uri} controls>
            Your browser does not support the audio element.
        </audio>
    )
}

export default AudioFile