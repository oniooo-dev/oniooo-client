import React from 'react'
import UserProfileIcon from '../layout/UserProfileIcon';
import AuthButton from '../layout/AuthButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleRouter = (path: string) => {
        router.push(path);
    }

    return (
        <div className="flex-horizontal items-center justify-between w-full pl-4 pr-4 py-1 bg-white bg-opacity-15 z-10 text-[12px] backdrop-filter backdrop-blur-lg">
            <div className="flex-horizontal items-center justify-between gap-0 mt-[2px]">
                <p className="text-[#f6ccff] cursor-pointer px-5 py-2 bg-black bg-opacity-0 hover:bg-opacity-20 duration-500 rounded-xl" onClick={() => handleRouter("/melody")}>Melody</p>
                <p className="text-[#fec4c6] cursor-pointer px-5 py-2 bg-black bg-opacity-0 hover:bg-opacity-20 duration-500 rounded-xl" onClick={() => handleRouter("/mochi")}>Mochi Shop</p>
                <p className="text-[#fff0c0] cursor-pointer px-5 py-2 bg-black bg-opacity-0 hover:bg-opacity-20 duration-500 rounded-xl" onClick={() => handleRouter("/meowvice")}>Pricing</p>
            </div>
            {
                isAuthenticated ? <div className="flex-horizontal items-center justify-between gap-6">
                    <UserProfileIcon />
                    <img src="/icons/socials/discord.png" className="w-[14px] h-auto object-contain cursor-pointer opacity-60 hover:opacity-100 duration-500" alt="New Chat" />
                    <img src="/icons/navbar/brush.png" className="w-[15px] h-auto object-contain cursor-pointer" alt="customize background" />
                </div> : <AuthButton />
            }

        </div>
    )
}

export default Navbar