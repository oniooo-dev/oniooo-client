import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const UserProfileIcon = () => {
	const router = useRouter();
	const iconUrl = useSelector((state: RootState) => state.auth.user?.icon_url);

	const handleProfileClick = () => {
		router.push("/me");
	};

	return (
		<div className="cursor-pointer p-1 rounded-lg" onClick={handleProfileClick}>
			<img src={iconUrl} className="w-8 h-8 rounded-full bg-white hover:opacity-50 duration-500" />
		</div>
	);
};

export default UserProfileIcon;
