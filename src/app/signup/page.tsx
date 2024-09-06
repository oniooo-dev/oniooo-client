"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../store/useAppDispatch";
import { register } from "../../store/features/auth/authThunks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const SignupPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const error = useSelector((state: RootState) => state.auth.error);
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const formInputStyle = "w-[300px] h-[45px] rounded-[10px] px-5 bg-white bg-opacity-10 focus:outline-none ring-0";

	const handleBack = () => {
		router.push("/melody");
	};

	const handleLogin = () => {
		router.push("/login");
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (username === "" || email === "" || password === "") {
			return;
		}
		const credentials: { username: string; email: string; password: string } = {
			username,
			email,
			password,
		};
		dispatch(register(credentials));
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
			<div
				className={`absolute top-0 left-0 flex flex-row items-center px-10 py-8 gap-2 hover:gap-3 duration-500 
							text-white text-opacity-50 hover:text-opacity-100 hover:scale-[1.01] cursor-pointer`}
				onClick={handleBack}
			>
				<img
					src="https://www.iconpacks.net/icons/2/free-arrow-left-icon-3099-thumb.png"
					className="w-[13px] h-[13px] filter invert"
				/>
				<p>Back</p>
			</div>
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
				<p className="text-xl font-semibold mb-2">Create an account</p>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
					className={formInputStyle}
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					className={formInputStyle}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
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
					<p className="text-black font-semibold">Sign up</p>
				</button>
			</form>
			<div className="flex flex-col w-[300px] gap-2">
				<div className="flex flex-row w-full justify-center gap-2 py-1 text-[13px]">
					<p className="text-gray-300 opacity-70">Already have an account ?</p>
					<p className="text-white font-medium cursor-pointer" onClick={handleLogin}>
						Log in
					</p>
				</div>
				<div className="flex flex-row items-center w-full px-2 gap-2 text-[13px]">
					<hr className="border-gray-500 w-full" />
					<p className="text-gray-500 opacity-80">OR</p>
					<hr className="border-gray-500 w-full" />
				</div>
				<div className="flex flex-row gap-2 w-full mt-2">
					<div className="flex flex-row gap-2 w-full mt-2">
						<div className="flex flex-row items-center gap-2 w-full">
							<p className="text-white cursor-pointer">Google</p>
						</div>
						<div className="flex flex-row items-center gap-2 w-full">
							<p className="text-white cursor-pointer">Discord</p>
						</div>
						<div className="flex flex-row items-center gap-2 w-full">
							<p className="text-white cursor-pointer">Microsoft</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
