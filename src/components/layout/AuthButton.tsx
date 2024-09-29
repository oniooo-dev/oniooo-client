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
		<div className="flex flex-row items-center justify-center gap-2 px-5 py-2 bg-white bg-opacity-15 hover:bg-opacity-30 duration-500 rounded-xl cursor-pointer">
			{/* <p onClick={handleSignUp} className="cursor-pointer px-4 py-2 bg-black bg-opacity-0 hover:bg-opacity-20 duration-500 rounded-xl">Sign up</p>
			<p onClick={handleLogin} className="cursor-pointer px-4 py-2 bg-black bg-opacity-0 hover:bg-opacity-20 duration-500 rounded-xl">Login</p> */}
			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png" className="w-4 h-4" alt="Google" />
			<p onClick={handleLogin} className="mt-[2px]">Continue with Google</p>
		</div>
	);
};

export default AuthButton;
