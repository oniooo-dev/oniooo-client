import React, { useEffect, useState } from "react";
import MochiBanner from "./MochiBanner";
import config from "@/config";

const MochiMenu = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch(`${config.backendUrl}/products`)
			.then(res => res.json())
			.then(data => setProducts(data))
			.catch(err => console.error('Error fetching products:', err));
	}, []);

	const trackConversion = (amount: number) => {
		if (typeof window !== 'undefined' && window.gtag) {
			window.gtag('event', 'conversion', {
				'send_to': 'AW-16780884369/EtmiCMndsesZEJHz38E-',
				'value': amount,
				'currency': 'USD',
			});
			console.log('Conversion event tracked');
		} else {
			console.warn('gtag is not available');
		}
	};

	const handleBuyClick = async (amount: number) => {
		try {
			// Your existing buy logic
			trackConversion(amount); // Track conversion after successful buy
		} catch (error) {
			console.error('Error initiating checkout:', error);
		}
	};

	return (
		<div className="grid grid-cols-3 w-1/2 gap-4">
			{products.map((product: any) => (
				<MochiBanner
					key={product.id}
					name={product.name}
					price={product.price}
					amount={product.amount}
					priceId={product.priceId}
					onClick={() => handleBuyClick(product.price)} // Pass the handler to MochiBanner
				/>
			))}
		</div>
	);
};

export default MochiMenu;
