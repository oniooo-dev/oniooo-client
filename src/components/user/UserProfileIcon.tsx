import React from "react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileIconProps {
	onClick: () => void;
}

const UserProfileIcon: React.FC<UserProfileIconProps> = ({ onClick }) => {

	const { isAuthenticated, user } = useAuth();

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	}

	return (
		<div className="cursor-pointer" onClick={handleClick}>
			<img
				src={isAuthenticated ? "/icons/messages/user_pfp.png" : "/icons/melody/profile-icon.png"}
				className={`w-[24px] h-[24px] rounded-full hover:opacity-50 duration-500 
							ml-auto 
							${isAuthenticated ? "border-2 border-white border-opacity-20" : "opacity-100 filter invert"}`}
			/>
		</div>
	);
};

export default UserProfileIcon;
