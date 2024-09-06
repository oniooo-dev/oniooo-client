import { discord } from "@/store/features/auth/authThunks";
import { useAppDispatch } from "@/store/useAppDispatch";
import React from "react";

const ThirdPartyAuth = () => {
	const dispatch = useAppDispatch();

	const handleDiscord = () => {
		dispatch(discord());
	};

	return (
		<div className="flex flex-row gap-2 w-full mt-2">
			<div className="flex flex-row items-center gap-2 w-full">
				<p className="text-white cursor-pointer">Google</p>
			</div>
			<div className="flex flex-row items-center gap-2 w-full" onClick={handleDiscord}>
				<p className="text-white cursor-pointer">Discord</p>
			</div>
			<div className="flex flex-row items-center gap-2 w-full">
				<p className="text-white cursor-pointer">Microsoft</p>
			</div>
		</div>
	);
};

export default ThirdPartyAuth;
