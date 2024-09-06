"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../store/useAppDispatch";
import { login } from "../../store/features/auth/authThunks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BackButton from "@/components/layout/BackButton";
import ThirdPartyAuth from "@/components/ui/ThirdPartyAuth";

const LoginPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const error = useSelector((state: RootState) => state.auth.error);

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

	const formInputStyle = "w-[300px] h-[45px] rounded-[10px] px-5 bg-white bg-opacity-10 focus:outline-none ring-0";

	const handleSignup = () => {
		router.push("/signup");
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (email === "" || password === "") {
			return;
		}
		const credentials: { email: string; password: string } = { email, password };
		dispatch(login(credentials));
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/melody");
		}
	}, [isAuthenticated]);

	return (
		<div className={`flex flex-col w-screen h-screen items-center justify-center gap-3 bg-black bg-opacity-90`}>
			<div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
				<img
					src="https://www.hdwallpapers.in/download/anime_weathering_with_you_4k_hd-3840x2160.jpg"
					className="w-full h-full bg-cover bg-opacity-20"
				/>
			</div>
			<BackButton />
			<div className="absolute inset-x-0 bottom-0 flex flex-row justify-center gap-2 mx-auto w-max text-white text-opacity-60 text-[13px] mb-6">
				<p className="cursor-pointer text-white text-opacity-60 hover:text-opacity-100 duration-500">
					Terms of Service
				</p>
				<p>|</p>
				<p className="cursor-pointer text-white text-opacity-60 hover:text-opacity-100 duration-500">
					Privacy Policy
				</p>
			</div>
			<form className="flex flex-col items-center gap-3 text-white text-[14px]" onSubmit={handleSubmit}>
				<p className="text-xl font-semibold mb-2">Login</p>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={handleEmailChange}
					className={formInputStyle}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
					className={formInputStyle}
				/>
				{error && (
					<div className="flex items-center justify-center px-4 border border-red-600 border-opacity-50 w-full h-[45px] rounded-[10px]">
						<p className="text-white text-xs">{error}</p>
					</div>
				)}
				<button
					className="w-[300px] h-[45px] rounded-[10px] bg-white bg-opacity-100 hover:bg-opacity-80 cursor-pointer"
					type="submit"
				>
					<p className="text-black font-semibold">Login</p>
				</button>
			</form>
			<div className="flex flex-col w-[300px] gap-2">
				<div className="flex flex-row w-full justify-center gap-2 py-1 text-[13px]">
					<p className="text-gray-300 opacity-70">Don't have an account ?</p>
					<p className="text-white font-medium cursor-pointer" onClick={handleSignup}>
						Sign up
					</p>
				</div>
				<div className="flex flex-row items-center w-full px-2 gap-2 text-[13px]">
					<hr className="border-gray-500 w-full" />
					<p className="text-gray-500 opacity-80">OR</p>
					<hr className="border-gray-500 w-full" />
				</div>
				<ThirdPartyAuth />
			</div>
		</div>
	);
};

export default LoginPage;
