import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const UserProfileIcon = () => {
	const iconUrl = useSelector((state: RootState) => state.auth.user?.icon_url);

	return (
		<div className="cursor-pointer">
			<img src={iconUrl} className="w-8 h-8 rounded-full bg-white hover:opacity-50 duration-500" />
		</div>
	);
};

export default UserProfileIcon;
