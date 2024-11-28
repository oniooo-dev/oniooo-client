import config from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

interface MochiBannerProps {
	name: string;
	price: number;
	amount: number;
	priceId: string;
}

const MochiBanner: React.FC<MochiBannerProps> = ({ name, price, amount, priceId }) => {

	const { user } = useAuth();

	const handleBuyClick = async () => {
		try {

			// If user is not authenticated, redirect to melody
			if (!user || !user.userId) {
				window.location.href = '/melody';
				return;
			}

			const response = await fetch(`${config.backendUrl}/create-checkout-session`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					priceId,
					userId: user.userId,
					amount,
				}),
			});
			const { url } = await response.json();
			window.location.href = url; // Redirect user to Stripe Checkout
		}
		catch (error) {
			console.error('Error initiating checkout:', error);
		}
	};

	return (
		<div
			className="flex-vertical justify-center items-center bg-white bg-opacity-20 rounded-xl w-full h-full px-4 py-4 gap-4 hover:scale-[1.01] cursor-pointer duration-500"
			onClick={handleBuyClick}
		>
			<p className="text-lg">{name}</p>
			<div className="flex-vertical items-center mt-4 gap-4">
				<img
					src="/icons/main-logo/oniooo-big.png"
					alt="mochi"
					className="w-[100px] h-auto bg-cover bg-opacity-20"
				/>
				{/* <p className="text-xl font-medium mt-4">{amount}</p> */}
				<p className="text-lg">{`$ ${price}`}</p>
			</div>
		</div>
	);
};

export default MochiBanner;
