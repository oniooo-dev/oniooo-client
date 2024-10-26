import React from "react";

interface MochiBannerProps {
	name: string;
	price: number;
	amount: number;
}

const MochiBanner: React.FC<MochiBannerProps> = ({ name, price, amount }) => {
	return (
		<div className="flex-vertical p-1 bg-gradient-to-br from-blue-400 to-pink-300 text-transparent rounded-xl w-full h-full hover:scale-[1.01] cursor-pointer duration-500">
			<div className="flex-vertical w-full h-full bg-black bg-opacity-80 gap-2 rounded-xl">
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
					<p className="text-lg">{amount}</p>
				</div>
			</div>
		</div>
	);
};

export default MochiBanner;
