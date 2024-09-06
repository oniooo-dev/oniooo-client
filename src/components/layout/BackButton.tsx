import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
	const router = useRouter();

	const handleBack = () => {
		router.push("/melody");
	};

	return (
		<div
			className={`absolute top-0 left-0 flex flex-row items-center justify-center px-10 py-8 gap-2 hover:ml-1 duration-500 
							text-white text-opacity-50 hover:text-opacity-100 hover:scale-[1.02] cursor-pointer`}
			onClick={handleBack}
		>
			<img
				src="https://www.iconpacks.net/icons/2/free-arrow-left-icon-3099-thumb.png"
				className="w-[13px] h-[13px] filter invert"
			/>
			<p>Back</p>
		</div>
	);
};

export default BackButton;
