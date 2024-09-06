import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
	const router = useRouter();

	const handleSignUp = () => {
		router.push("/signup");
	};

	const handleLogin = () => {
		router.push("/login");
	};

	return (
		<div className="flex flex-row gap-2">
			<button
				className={`text-[13px] bg-black w-[96px] h-[37px] rounded-[10px] bg-opacity-60 hover:opacity-60 duration-500 cursor-pointer`}
				onClick={handleSignUp}
			>
				Sign Up
			</button>
			<button
				className={`text-[13px] bg-gray-300 w-[96px] h-[37px] rounded-[10px] bg-opacity-30 hover:opacity-60 duration-500 cursor-pointer`}
				onClick={handleLogin}
			>
				Login
			</button>
		</div>
	);
};

export default AuthButton;
