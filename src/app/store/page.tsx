"use client";

import ProductSearch from "@/components/store/ProductSearch/ProductSearch";
import ProductSection from "@/components/store/ProductSection/ProductSection";
import QuickAddSection from "@/components/store/QuickAddSection/QuickAddSection";
import StoreHeaderBanner from "@/components/store/StoreHeaderBanner/StoreHeaderBanner";
import SuggestionSection from "@/components/store/SuggestionSection/SuggestionSection";
import React, { useState } from "react";

const StorePage = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div className="flex flex-col w-full gap-16 px-[10vw] py-[10vh] overflow-y-scroll">
			<div>
				<ProductSearch searchQuery={searchQuery} onSearch={handleSearch} />
			</div>
			{searchQuery === "" && (
				<>
					<div className="mt-[5vh]">
						<StoreHeaderBanner />
					</div>
					<div className="flex flex-col items-center justify-center gap-8">
						<div className="w-full">
							<p className="text-4xl font-semibold">Quick Add</p>
						</div>
						<QuickAddSection />
					</div>
					<div className="flex flex-col items-center justify-center gap-8">
						<p className="text-6xl font-semibold">For you</p>
						<SuggestionSection />
					</div>
				</>
			)}
			<div className="flex flex-col items-center justify-center gap-8">
				<p className="text-6xl font-semibold">Stuff</p>
				<ProductSection />
			</div>
		</div>
	);
};

export default StorePage;
