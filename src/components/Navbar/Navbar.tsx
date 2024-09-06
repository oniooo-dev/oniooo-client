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
		setSelectedPage(pathname);
	}, [pathname]);

	return (
		<div className="flex flex-row gap-2 w-full">
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
