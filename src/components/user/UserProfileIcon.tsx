import React from "react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileIconProps {
	onClick: () => void;
}

const UserProfileIcon: React.FC<UserProfileIconProps> = ({ onClick }) => {

	const { user } = useAuth();

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	}

	return (
		<div className="cursor-pointer" onClick={handleClick}>
			<img
				src={user?.iconUrl}
				className="w-[40px] h-[40px] rounded-full bg-white hover:opacity-50 duration-500 
						   border-0 border-white border-opacity-20 ml-auto"
			/>
		</div>
	);
};

export default UserProfileIcon;
