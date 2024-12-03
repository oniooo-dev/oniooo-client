import React from 'react';
import GoogleAuthButton from '../auth/GoogleAuthButton';

interface InsufficientMochiBalanceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InsufficientMochiBalanceModal: React.FC<InsufficientMochiBalanceModalProps> = ({ isOpen, onClose }) => {

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
                    max-w-[550px]
                    h-[80vh]
                    max-h-[300px]
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
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-2xl font-medium text-white">Mahoo! You don’t have enough</p>
                        <p className="text-2xl font-medium text-white">mochis to feed Melody (。-`ω´-)</p>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-8">
                        <img src="/images/cute_bouncing.gif" className="w-14 h-14 rounded-full rotate-180" />
                        <button
                            className="bg-white text-black px-6 py-4 rounded-full flex flex-row items-center justify-center gap-2 hover:bg-opacity-80 transition-all duration-300"
                            onClick={() => {
                                window.location.href = '/shop';
                            }}
                        >
                            <img src="/icons/main-logo/oniooo-big.png" className="w-8 h-8" />
                            <p className="text-md font-medium">Mochi Shop</p>
                        </button>
                        <img src="/images/cute_bouncing.gif" className="w-14 h-14 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsufficientMochiBalanceModal;