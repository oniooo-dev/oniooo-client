import React, { useState } from 'react'
import GoogleAuthButton from '../auth/GoogleAuthButton'
import { useAuth } from '@/contexts/AuthContext';
import UserProfileIcon from '../user/UserProfileIcon';
import UserProfileMenu from '../user/UserProfileMenu';

const UserCorner = () => {
    const { isAuthenticated } = useAuth();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className="z-20">
            {
                isAuthenticated
                    ?
                    <div className="flex flex-col gap-2">
                        <UserProfileIcon onClick={handleShowMenu} />
                        {showMenu && <UserProfileMenu />}
                    </div>
                    :
                    <GoogleAuthButton />
            }
        </div>
    )
}

export default UserCorner