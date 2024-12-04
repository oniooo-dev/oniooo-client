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
import DiscordButton from '@/components/layout/DIscordButton';
import ConfidentialityButton from '@/components/layout/ConfidentialityButton';

const MelodyInterface = () => {

  const { error } = useChatSocket();

  // Modals
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailureModal, setShowFailureModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showInsufficientMochiBalanceModal, setShowInsufficientMochiBalanceModal] = useState<boolean>(false);

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

  return (
    <div className="relative flex flex-col w-[100vw] h-[100vh] bg-black bg-opacity-[0.83] text-white">
      <EpicBackground />
      <div className="flex flex-col absolute bottom-4 right-6 z-10 gap-2">
        <DiscordButton />
        <ConfidentialityButton
          showHelpModal={showHelpModal}
          setShowHelpModal={setShowHelpModal}
        />
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