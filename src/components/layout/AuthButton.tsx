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
		<div className="flex flex-row gap-8">
			<p onClick={handleSignUp}>Sign up</p>
			<p onClick={handleLogin}>Login</p>
		</div>
	);
};

export default AuthButton;
