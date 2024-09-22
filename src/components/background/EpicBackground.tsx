import React from 'react'

const EpicBackground = () => {
    return (
        <img
            src="/backgrounds/default-background.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ zIndex: -1 }}
        />
    )
}

export default EpicBackground