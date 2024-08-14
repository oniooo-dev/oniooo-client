import React from "react";
import Link from "next/link";
import SideExtensions from "./SideExtensions/SideExtensions";
import ModelProfileBanner from "./ModelProfileBanner/ModelProfileBanner";

const Navbar = () => {
	return (
		<div className="flex flex-col h-screen justify-between gap-2 p-2 bg-gray-900">
			<div>
				<p className="text-xl font-semibold">Oniooo</p>
			</div>
			<div>
				<ModelProfileBanner />
			</div>
			<div className="flex h-full">
				<SideExtensions />
			</div>
		</div>
	);
};

export default Navbar;
