import { register } from "@/store/features/auth/authThunks";
import { useAppDispatch } from "@/store/hooks";
import React, { useState } from "react";

type RegisterSubmitData = {
	username: string;
	email: string;
	password: string;
};

interface RegisterModalProps {
	loading: boolean;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ loading }) => {
	const dispatch = useAppDispatch();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const credentials: RegisterSubmitData = { username, email, password };
		console.log(credentials);
		dispatch(register(credentials));
	};

	const boxStyle = "text-white px-4 py-2 rounded-lg focus:outline-none ring-0";

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
			<div className="flex items-center justify-center">
				<h1>Register</h1>
			</div>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className={`${boxStyle} bg-white bg-opacity-20`}
			/>
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
			<input
				type="submit"
				value={loading ? `loading` : `Sign Up`}
				className={`${boxStyle} bg-blue-600 cursor-pointer hover:bg-blue-700`}
			/>
		</form>
	);
};

export default RegisterModal;
