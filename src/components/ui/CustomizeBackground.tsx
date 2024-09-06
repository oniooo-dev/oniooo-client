import React, { useRef } from "react";

const CustomizeBackground = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		console.log(file);
		if (file) {
			console.log("file uploaded");
			// const reader = new FileReader();
			// reader.onload = function (upload) {
			// 	localStorage.setItem("storedImage", upload.target?.result as string);
			// };
			// reader.readAsDataURL(file);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center w-full min-h-[300px] h-1/2 p-4 gap-3 rounded-xl bg-white bg-opacity-20">
			<div
				className="flex flex-row items-center justify-center px-8 py-3 gap-4 bg-black bg-opacity-40 hover:bg-opacity-80 rounded-xl duration-500 cursor-pointer"
				onClick={handleButtonClick}
				ref={fileInputRef}
			>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					style={{ display: "none" }}
					ref={fileInputRef}
				/>
				<img
					src="https://static.thenounproject.com/png/1337310-200.png"
					alt="upload"
					className="w-6 h-6 filter invert"
				/>
				<h1 className="text-lg font-semibold text-white">Upload Image</h1>
			</div>
			<div>
				<p className="text-white">or drag here</p>
			</div>
		</div>
	);
};

export default CustomizeBackground;
