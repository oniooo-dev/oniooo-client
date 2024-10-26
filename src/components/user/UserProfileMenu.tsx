import React from 'react'
import ProfileMenuItem from './ProfileMenuItem'
import { useAuth } from '@/contexts/AuthContext';

const UserProfileMenu = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        console.log("Dispatching logout ...")
        try {
            logout();  // Call the logout function
            console.log('Logged out successfully.');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="flex flex-col rounded-lg bg-white bg-opacity-50 w-48 gap-1 p-1">
            <ProfileMenuItem label="Profile" />
            <ProfileMenuItem label="Settings" />
            <ProfileMenuItem label="Logout" onClick={handleLogout} />
        </div>
    )
}

export default UserProfileMenu