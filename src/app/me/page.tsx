"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/features/auth/authThunks";

const MePage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useSelector((state: RootState) => state.auth.user);

	const subscriptionBannerStyle = "w-full h-96 px-16 py-16 bg-white bg-opacity-20 rounded-lg";

	const handleLogout = () => {
		dispatch(logout());
	};

	if (!user) {
		router.push("/home");
	}

	return (
		<div className="flex flex-row w-full h-full bg-black text-white">
			<div className="w-[1px] bg-gray-300 bg-opacity-20 z-10"></div> {/* This is a line. */}
			<div className="flex flex-col w-full p-4 gap-16">
				<div className="flex flex-col w-full gap-4">
					<p className="text-5xl font-bold">Account</p>
					<div className="flex flex-row w-full gap-4 items-center">
						<img src={user?.icon_url} className="w-36 h-36 rounded-full" />
						<div className="flex flex-col w-full">
							<p>Hi {user?.username}</p>
							<p>Current logged in as {user?.email}</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full gap-4">
					<p className="text-3xl font-bold">Subscriptions</p>
					<div className="grid grid-cols-2 w-full gap-4 items-center">
						<div className={subscriptionBannerStyle}></div>
						<div className={subscriptionBannerStyle}></div>
					</div>
				</div>
				<div className="px-4 py-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-40 cursor-pointer" onClick={handleLogout}>
					Logout
				</div>
			</div>
		</div>
	);
};

export default MePage;
