"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import BackButton from "@/components/layout/BackButton";
import CustomizeBackground from "@/components/ui/CustomizeBackground";
import EditProfileBanner from "@/components/ui/EditProfileBanner";
import MochiMenu from "@/components/ui/MochiMenu";

const MePage = () => {
	const router = useRouter();
	const user = useSelector((state: RootState) => state.auth.user);

	if (!user) {
		router.push("/home");
	}

	return (
		<div className="flex flex-col md:flex-row w-screen h-full md:h-screen px-16 py-16 bg-black text-white">
			<BackButton />
			<div className="flex flex-col w-full md:w-1/2 h-full">
				<MochiMenu />
			</div>
			<div className="flex-vertical w-full md:w-1/2 h-full">
				<div className="flex-vertical p-8 w-full h-full gap-4">
					<p className="text-lg">Customize your background</p>
					<CustomizeBackground />
					<EditProfileBanner />
				</div>
			</div>
		</div>
	);
};

export default MePage;
