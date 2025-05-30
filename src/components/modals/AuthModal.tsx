import React from 'react';
import GoogleAuthButton from '../auth/GoogleAuthButton';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {

    // If the modal is not open, return null
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="
                    w-[90%]
                    max-w-[800px]
                    h-[80vh]
                    max-h-[550px]
                    bg-[url('/images/unauth_modal.png')]
                    bg-cover
                    bg-center
                    bg-no-repeat
                    rounded-[55px]
                    shadow-lg
                    relative
                    border-2
                    border-[#ffa9ac]
                "
                onClick={(e) => e.stopPropagation()}
            >
                {/* <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button> */}
                {/* Your modal content goes here */}
                <div className="flex flex-col items-center justify-center h-full gap-12">
                    <div className="flex flex-row items-center justify-center gap-3">
                        <img src="/icons/main-logo/oniooo-small.png" alt="Oniooo" className="w-12 h-12 rounded-full" />
                        <h1 className="text-3xl font-bold text-white">Oniooo</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <h1 className="text-xl font-medium text-white">Enhanced Claude 3.5 Sonnet</h1>
                        <h1 className="text-xl font-medium text-white">paired with top AI models</h1>
                    </div>
                    <div>
                        <h1 className="text-xl font-medium text-white">Oniooo masters content creation for you.</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="flex flex-row items-center justify-center gap-8">
                            <img src="/images/cute_bouncing.gif" className="w-12 h-12 rounded-full rotate-180" />
                            <div className="scale-125">
                                <GoogleAuthButton />
                            </div>
                            <img src="/images/cute_bouncing.gif" className="w-12 h-12 rounded-full" />
                        </div>
                        <div className="flex flex-row items-center justify-center gap-2">
                            <img src="/icons/main-logo/oniooo-small.png" className="w-4 h-4" />
                            <h1 className="text-md text-white">50 Free Mochis</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;