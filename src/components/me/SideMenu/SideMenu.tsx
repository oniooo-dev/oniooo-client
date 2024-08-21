import { ME_MENU_LINKS } from "@/lib/constants";
import React from "react";

const SideMenu = () => {
	return (
		<div className="flex flex-col w-[300px] gap-2 px-2 py-4">
			{ME_MENU_LINKS.map((link, index) => (
				<div
					key={index}
					className="flex flex-row items-center gap-3 p-2 rounded-lg bg-white bg-opacity-0 hover:bg-opacity-20 cursor-pointer duration-500"
				>
					<img src={link.iconUrl} className="w-8 h-8 rounded-full" />
					<span>{link.title}</span>
				</div>
			))}
		</div>
	);
};

export default SideMenu;
