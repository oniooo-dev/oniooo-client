import React from 'react'

interface ProfileMenuItemProps {
    label: string
    onClick?: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ label, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }
    return (
        <div
            className="text-center bg-black bg-opacity-0 hover:bg-opacity-20 p-2 rounded-lg cursor-pointer duration-500"
            onClick={handleClick}
        >
            <p className="text-black">{label}</p>
        </div>
    )
}

export default ProfileMenuItem