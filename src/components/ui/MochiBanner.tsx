import React from "react";

interface MochiBannerProps {
	name: string;
	price: number;
	amount: number;
}

const MochiBanner: React.FC<MochiBannerProps> = ({ name, price, amount }) => {
	return (
		<div className="flex-vertical p-4 bg-white bg-opacity-20 rounded-xl w-full h-full hover:scale-[1.03] cursor-pointer duration-500">
			<div className="flex-horizontal items-center justify-between w-full">
				<p className="text-lg">{name}</p>
				<p className="text-lg">{`$ ${price}`}</p>
			</div>
			<div className="flex-vertical items-center mt-4">
				<img
					src="https://i.ytimg.com/vi/hT1HC2N_F1o/maxresdefault.jpg"
					alt="mochi"
					className="w-[100px] h-auto bg-cover bg-opacity-20"
				/>
				<p className="text-lg">{amount}</p>
			</div>
		</div>
	);
};

export default MochiBanner;
