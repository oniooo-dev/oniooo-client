import React from "react";

interface ProductSearchProps {
	searchQuery: string;
	onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ searchQuery, onSearch }) => {
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		onSearch(event);
	};

	return (
		<input
			type="text"
			value={searchQuery}
			onChange={handleSearch}
			placeholder="Search for products"
			className="text-black w-1/3 px-4 py-2 rounded-lg focus:outline-none ring-0"
		/>
	);
};

export default ProductSearch;
