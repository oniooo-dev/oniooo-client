import { useRouter } from "next/navigation";
import React from "react";

const UserCurrencyBalance = () => {
	const router = useRouter();

	const handleCurrencyClick = () => {
		router.push("/mochi");
	};

	const currentAmount = 2090;
	return (
		<div
			className="flex flex-row items-center px-4 h-10 gap-3 rounded-lg bg-black bg-opacity-60 hover:opacity-60 duration-300 cursor-pointer"
			onClick={handleCurrencyClick}
		>
			<img
				src="https://play-lh.googleusercontent.com/Yl_DmFMJrR7cLUqDd9A2OpevA-5dwbCDQkyxNOGUb0HwVykaxXxpHR8qFsDEJHuQDA8"
				className="w-[20px] h-[20px]"
			/>
			<p className="text-sm font-medium">{currentAmount}</p>
		</div>
	);
};

export default UserCurrencyBalance;
