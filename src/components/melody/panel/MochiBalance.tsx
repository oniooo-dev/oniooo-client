import { useAuth } from '@/contexts/AuthContext';
import React from 'react'

interface MochiBalanceProps {
  onClick: () => void;
}

const MochiBalance: React.FC<MochiBalanceProps> = ({ onClick }) => {

  const { user } = useAuth();

  const handleBannerClick = () => {
    onClick();
  }

  return (
    <div
      className="flex items-center justify-between w-full py-3 px-5 bg-black bg-opacity-30
                 rounded-[18px] cursor-pointer hover:opacity-60 duration-500"
      onClick={handleBannerClick}
    >
      <div className="flex flex-row items-center gap-3">
        <img src="/icons/main-logo/oniooo-small.png" className="w-[22px] h-[22px]" alt="Mochi Icon" />
        <p className="text-[14px] font-normal mt-[1px]">
          {
            user ? user.mochiBalance : "XXX"
          }
        </p>
      </div>
      <img src="/icons/melody/mochi-market.png" className="w-[22px] h-[22px] opacity-80" alt="Mochi Store" />
    </div>
  )
}

export default MochiBalance