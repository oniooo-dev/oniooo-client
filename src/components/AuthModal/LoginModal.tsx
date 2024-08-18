import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/features/auth/authThunks";

interface LoginSubmitData {
	email: string;
	password: string;
}

interface LoginModalProps {
	loading: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ loading }) => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const credentials: LoginSubmitData = { email, password };
		console.log(credentials);
		dispatch(login(credentials));
	};

	const boxStyle = "text-white px-4 py-2 rounded-lg focus:outline-none ring-0";

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
			<div className="flex items-center justify-center">
				<h1>Login</h1>
			</div>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className={`${boxStyle} bg-white bg-opacity-20`}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className={`${boxStyle} bg-white bg-opacity-20`}
			/>
			<p className="text-sm cursor-pointer">Forgot your password?</p>
			<input
				type="submit"
				value={loading ? `loading` : `Login`}
				className={`${boxStyle} bg-blue-600 cursor-pointer hover:bg-blue-700`}
			/>
		</form>
	);
};

export default LoginModal;
