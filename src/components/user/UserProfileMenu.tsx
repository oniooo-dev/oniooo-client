import React from 'react'
import ProfileMenuItem from './ProfileMenuItem'
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const UserProfileMenu = () => {

    const router = useRouter();
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

    const handleShopRedirect = () => {
        router.push("/shop")
    }

    return (
        <div className="flex flex-col rounded-lg bg-gray-300 w-48 gap-1 p-1">
            <ProfileMenuItem label="Profile" onClick={handleShopRedirect} />
            <ProfileMenuItem label="Mochi Shop" onClick={handleShopRedirect} />
            <ProfileMenuItem label="Logout" onClick={handleLogout} />
        </div>
    )
}

export default UserProfileMenu