import SideMenu from "@/components/me/SideMenu/SideMenu";
import React from "react";

const page = () => {
	return (
		<div className="flex flex-row w-full h-full">
			<div className="w-[1px] bg-gray-300 bg-opacity-20 z-10"></div> {/* This is a line. */}
			<SideMenu />
			<div className="w-[1px] bg-gray-300 bg-opacity-20 z-10"></div> {/* This is a line. */}
		</div>
	);
};

export default page;
