import React from "react";

const ThirdPartyAuth = () => {
	return (
		<div className="flex flex-col w-full justify-center items-center gap-4">
			<div className="flex flex-row justify-between items-center w-full px-5 py-4 bg-white bg-opacity-10 hover:bg-opacity-5 rounded-xl cursor-pointer duration-500 backdrop-filter backdrop-blur-lg">
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png" className="w-7 h-7" alt="Google" />
				<p className="text-[#f2f2f2] cursor-pointer">Continue with Google</p>
				<div></div>
			</div>
		</div>
	);
};

export default ThirdPartyAuth;
