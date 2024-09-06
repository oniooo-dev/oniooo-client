"use client";

import React, { useCallback, useEffect, useState } from "react";
import NavbarLink from "./NavbarLink";
import { NAVBAR_LINKS } from "@/lib/constants";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathname = usePathname();

	const [selectedPage, setSelectedPage] = useState<string>("");

	const handlePageSelect = useCallback((href: string) => {
		setSelectedPage(href);
		window.history.pushState({}, "", href);
	}, []);

	useEffect(() => {
<<<<<<< HEAD
		setSelectedPage(pathname);
	}, [pathname]);

	return (
		<div className="flex flex-row gap-2 w-full">
=======
		// Set the initial state once the component is mounted on the client
		setSelectedPage(window.location.pathname);

		// Add event listener for popstate event on window
		window.addEventListener("popstate", handleRouteChange);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("popstate", handleRouteChange);
		};
	}, []);

	useEffect(() => {
		console.log("Authentication status changed:", isAuthenticated ? "Authenticated" : "Not authenticated");
		if (isAuthenticated) {
			setIsAuthModalOpen(false);
		}
	}, [isAuthenticated]);

	if (pathname === "/") {
		return null;
	}

	return (
		<div className="flex flex-row gap-2 px-2 w-full">
			<div
				onClick={handleProfileIconClick}
				className="flex items-center justify-center w-11 h-11 rounded-lg bg-white bg-opacity-0 hover:bg-opacity-20 duration-500 cursor-pointer"
			>
				{isAuthenticated ? (
					<img src="/icons/navbar/shin-chan-pfp.png" className="w-8 h-8 rounded-full" />
				) : (
					<img src="/icons/navbar/unsigned-user-profile.png" className="w-7 h-7 rounded-full" />
				)}
			</div>
>>>>>>> 93a2e6609c7419898473533b42c078f7d6561893
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
	);
};

export default Navbar;
