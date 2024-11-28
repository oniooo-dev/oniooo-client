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

	return (
		<div className="grid grid-cols-3 w-1/2 h-1/2 gap-4">
			{
				products.map((product: any) => (
					<MochiBanner key={product.id} name={product.name} price={product.price} amount={product.amount} priceId={product.priceId} />
				))
			}
		</div>
	);
};

export default MochiMenu;
