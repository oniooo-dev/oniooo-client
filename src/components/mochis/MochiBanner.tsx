import React from "react";

interface MochiBannerProps {
	name: string;
	price: number;
	amount: number;
}

const MochiBanner: React.FC<MochiBannerProps> = ({ name, price, amount }) => {
	return (
		<div className="flex-vertical bg-white bg-opacity-20 rounded-xl w-full h-full px-6 py-4 hover:scale-[1.01] cursor-pointer duration-500">
			<div className="flex-horizontal items-center justify-between w-full">
				<p className="text-lg">{name}</p>
				<p className="text-lg">{`$ ${price}`}</p>
			</div>
			<div className="flex-vertical items-center mt-4">
				<img
					src="/icons/main-logo/oniooo-big.png"
					alt="mochi"
					className="w-[100px] h-auto bg-cover bg-opacity-20"
				/>
				<p className="text-xl font-medium mt-4">{amount}</p>
			</div>
		</div>
	);
};

export default MochiBanner;
