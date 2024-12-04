import EpicBackground from '@/components/background/EpicBackground'
import UserCorner from '@/components/layout/UserCorner';
import MochiPaymentFailureModal from '@/components/mochis/MochiPaymentFailureModal';
import MochiPaymentSuccessModal from '@/components/mochis/MochiPaymentSuccessModal';
import AuthModal from '@/components/modals/AuthModal';
import InsufficientMochiBalanceModal from '@/components/modals/InsufficientMochiBalanceModal';
import React, { useEffect, useState, useRef } from 'react'
import LeftPanel from '../panel/LeftPanel';
import Chat from '@/components/layout/Chat';
import { useChatSocket } from '@/contexts/ChatSocketContext';

const MelodyInterface = () => {

  const { error } = useChatSocket();

  // Modals
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailureModal, setShowFailureModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showInsufficientMochiBalanceModal, setShowInsufficientMochiBalanceModal] = useState<boolean>(false);

  // Refs
  const helpModalRef = useRef<HTMLDivElement>(null);

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const openInsufficientMochiBalanceModal = () => {
    setShowInsufficientMochiBalanceModal(true);
  };

  const closeInsufficientMochiBalanceModal = () => {
    setShowInsufficientMochiBalanceModal(false);
  };

  useEffect(() => {
    if (error === "INSUFFICIENT_MOCHI_BALANCE") {
      console.log("Opening insufficient mochi balance modal");
      openInsufficientMochiBalanceModal();
    }
  }, [error]);

  const handleHelpModal = () => {
    setShowHelpModal(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (helpModalRef.current && !helpModalRef.current.contains(event.target as Node)) {
        setShowHelpModal(false);
      }
    };

    if (showHelpModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHelpModal]);

  return (
    <div className="relative flex flex-col w-[100vw] h-[100vh] bg-black bg-opacity-[0.83] text-white">
      <EpicBackground />
      <div className="flex flex-col absolute bottom-4 right-6 z-10 gap-2">
        <div
          onClick={() => window.open("https://discord.gg/7KfWYMjd", "_blank")}
          className="p-3 rounded-full bg-white bg-opacity-20 opacity-50 hover:opacity-100 duration-500 cursor-pointer"
        >
          <img src="/icons/discord.png" className="w-[14px] object-contain" />
        </div>
        {
          showHelpModal &&
          <div
            ref={helpModalRef}
            className="absolute bottom-0 right-full mr-4 w-[200px] flex flex-col justify-center items-center gap-2 bg-white bg-opacity-20 rounded-xl px-4 py-3"
          >
            <div
              onClick={() => window.open("/privacy-policy", "_blank")}
              className="flex flex-row gap-2 w-full bg-white bg-opacity-0 hover:bg-opacity-20 duration-500 rounded-xl px-3 py-2 cursor-pointer">
              <img src="/icons/link.png" className="w-[14px] object-contain" />
              <p className="text-sm">
                Privacy Policy
              </p>
            </div>
            <div
              onClick={() => window.open("/terms-of-service", "_blank")}
              className="flex flex-row gap-2 w-full bg-white bg-opacity-0 hover:bg-opacity-20 duration-500 rounded-xl px-3 py-2 cursor-pointer">
              <img src="/icons/link.png" className="w-[14px] object-contain" />
              <p className="text-sm">
                Terms of Service
              </p>
            </div>
          </div>
        }
        <div
          onClick={handleHelpModal}
          className="p-3 rounded-full bg-white bg-opacity-20 opacity-50 hover:opacity-100 duration-500 cursor-pointer"
        >
          <img src="/icons/question_mark.png" className="w-[14px] object-contain" />
        </div>
      </div>
      {
        showSuccessModal &&
        <MochiPaymentSuccessModal
          show={showSuccessModal}
          onClose={
            () => setShowSuccessModal(false)
          }
        />
      }
      {
        showFailureModal &&
        <MochiPaymentFailureModal
          show={showFailureModal}
          onClose={
            () => setShowFailureModal(false)
          }
        />
      }
      {
        showAuthModal &&
        <AuthModal
          isOpen={showAuthModal}
          onClose={closeAuthModal}
        />
      }
      {
        showInsufficientMochiBalanceModal &&
        <InsufficientMochiBalanceModal
          isOpen={showInsufficientMochiBalanceModal}
          onClose={closeInsufficientMochiBalanceModal}
        />
      }
      <div className="absolute top-4 right-4 z-10">
        <UserCorner />
      </div>
      <div className="flex flex-row w-full h-full pl-4">
        <div className="w-fit h-full py-4">
          <LeftPanel />
        </div>
        <Chat
          openAuthModal={openAuthModal}
        />
      </div>
    </div>
  )
}

export default MelodyInterface