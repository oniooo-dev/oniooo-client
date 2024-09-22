import React from 'react'
import UserProfileIcon from '../layout/UserProfileIcon';
import AuthButton from '../layout/AuthButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Navbar = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    return (
        <div className="flex-horizontal items-center justify-between w-full px-12 py-3 bg-white bg-opacity-10 z-10 text-[13px]">
            <div className="flex-horizontal items-center justify-between gap-8">
                <p className="text-[#e1ccff]">Melody</p>
                <p className="text-[#fec4c6]">Mochi Shop</p>
                <p className="text-[#fff0c0]">Meowvice</p>
            </div>
            <div className="flex-horizontal items-center justify-between gap-6">
                <div className="w-8 h-8 bg-white bg-opacity-10 rounded-full"></div>
                <div className="w-8 h-8 bg-white bg-opacity-10 rounded-full"></div>
                {
                    isAuthenticated ? <UserProfileIcon /> : <AuthButton />
                }
            </div>
        </div>
    )
}

export default Navbar