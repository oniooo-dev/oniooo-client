import React from "react";

interface CustomerServiceBannerProps {
	isCustomerServiceInterfaceOpen: boolean;
	onClick: () => void;
}

const CustomerServiceBanner: React.FC<CustomerServiceBannerProps> = ({ isCustomerServiceInterfaceOpen, onClick }) => {
	const handleClick = () => {
		onClick();
	};
	return (
		<div
			className="flex flex-row w-full items-center justify-center py-2 bg-blue-500 bg-opacity-20 hover:bg-opacity-60 rounded-xl cursor-pointer duration-500"
			onClick={handleClick}
		>
			<p className="text-sm">1-888-TECH-SUPPORT</p>
		</div>
	);
};

export default CustomerServiceBanner;
