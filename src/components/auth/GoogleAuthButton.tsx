import { useAuth } from '@/contexts/AuthContext';
import React from 'react'

const GoogleAuthButton: React.FC = () => {
    const { login } = useAuth();

    const handleGoogleSignIn = async () => {
        try {
            login();
        } catch (error: any) {
            console.error('Error during sign in:', error.message);
        }
    };

    return (
        <button
            className="flex flex-row items-center justify-center gap-x-4 bg-white bg-opacity-90 px-5 py-3 rounded-[19px]
                       cursor-pointer hover:opacity-50 duration-500"
            onClick={handleGoogleSignIn}
        >
            <img
                src="https://user-images.githubusercontent.com/194400/70987158-4069c900-20b7-11ea-892e-8a2e1166b6b7.png"
                className="w-5 h-5"
            />
            <p className="text-sm text-black mr-2">Sign in</p>
        </button>
    )
}

export default GoogleAuthButton