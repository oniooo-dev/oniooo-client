"use client";

import React, { useEffect, useState } from "react";
import NavbarLink from "./NavbarLink";
import { NAVBAR_LINKS } from "@/lib/constants";

const Navbar = () => {
	// Initialize state without assuming access to window
	const [selectedPage, setSelectedPage] = useState<string>("");

	useEffect(() => {
		// Set the initial state once the component is mounted on the client
		setSelectedPage(window.location.pathname);

		const handleRouteChange = () => {
			setSelectedPage(window.location.pathname);
		};

		// Add event listener for popstate event on window
		window.addEventListener("popstate", handleRouteChange);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("popstate", handleRouteChange);
		};
	}, []);

	const handlePageSelect = (href: string) => {
		setSelectedPage(href);
		window.history.pushState({}, "", href);
	};

	return (
		<div className="flex flex-col h-screen justify-between gap-[5px] px-[8px] py-[14px]">
			<div className="flex flex-col w-full items-center gap-[5px]">
				{NAVBAR_LINKS.map((link, index) => (
					<NavbarLink
						key={index}
						href={link.href}
						iconUrl={link.iconUrl}
						onSelect={() => handlePageSelect(link.href)}
						selectedPage={selectedPage}
					/>
				))}
			</div>
			<div className="flex w-full items-center justify-center gap-2 mb-1 cursor-pointer">
				<div>
					<img src="/icons/navbar/shin-chan-pfp.png" className="w-9 h-9 rounded-full bg-white" />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
