import React, { useEffect } from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
}

const MochiPaymentSuccessModal: React.FC<ModalProps> = ({ show, onClose }) => {

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);

        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 bg-white bg-opacity-5 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="flex flex-col bg-white bg-opacity-60 backdrop-blur-lg rounded-[25px] 
                           justify-center items-center px-20 py-4 max-w-xl w-full max-h-[30vh] h-full"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl text-white font-bold mb-4">
                    Tyyyyy for ur pourchasssss 👉 👈
                </h2>
                <p className="text-white mb-4">Your payment has been processed successfully.</p>
                <button
                    className="mt-4 w-full py-3 bg-black bg-opacity-60 text-white rounded-[18px] hover:bg-opacity-40 
                               transition-colors duration-500"
                    onClick={onClose}
                >
                    Ok bro.
                </button>
            </div>
        </div>
    );
};

export default MochiPaymentSuccessModal;
