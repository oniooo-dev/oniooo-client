import React, { useState } from 'react'
import GoogleAuthButton from '../auth/GoogleAuthButton'
import { useAuth } from '@/contexts/AuthContext';

const UserCorner = () => {
    const { isAuthenticated } = useAuth();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className="z-20">
            {
                !isAuthenticated &&
                <GoogleAuthButton />
            }
        </div>
    )
}

export default UserCorner