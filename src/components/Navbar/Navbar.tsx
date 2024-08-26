"use client";

import React, { useCallback, useEffect, useState } from "react";
import NavbarLink from "./NavbarLink";
import { NAVBAR_LINKS } from "@/lib/constants";
import AuthModal from "../AuthModal/AuthModal";
import { RootState } from "@/store/store";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar = () => {
	const router = useRouter();
	const pathname = usePathname();

	const [selectedPage, setSelectedPage] = useState<string>("");
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	const goToProfilePage = () => {
		router.push("/me");
	};

	const handleAuthModalOpen = () => setIsAuthModalOpen(true);
	const handleAuthModalClose = () => setIsAuthModalOpen(false);

	const handlePageSelect = useCallback((href: string) => {
		setSelectedPage(href);
		window.history.pushState({}, "", href);
	}, []);

	const handleProfileIconClick = () => {
		console.log("Profile icon clicked");
		if (isAuthenticated) {
			console.log("User is authenticated");
			goToProfilePage();
		} else {
			console.log("User is not authenticated");
			handleAuthModalOpen();
		}
	};

	const handleRouteChange = () => {
		setSelectedPage(window.location.pathname);
	};

	useEffect(() => {
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
		console.log("Authentication status changed:", isAuthenticated);
		if (isAuthenticated) {
			setIsAuthModalOpen(false);
		}
	}, [isAuthenticated]);

	if (pathname === "/") {
		return null;
	}

	return (
		<div className="flex flex-col justify-between gap-[5px] px-[8px] pt-[14px] pb-[8px]">
			<div className="flex flex-col w-full items-center gap-[3px]">
				{NAVBAR_LINKS.map((link, index) => (
					<NavbarLink key={index} href={link.href} iconUrl={link.iconUrl} onSelect={() => handlePageSelect(link.href)} selectedPage={selectedPage} />
				))}
			</div>
			<div className="flex w-full items-center justify-center gap-2 mb-1 cursor-pointer">
				<div
					onClick={handleProfileIconClick}
					className="flex items-center justify-center w-11 h-11 rounded-lg bg-white bg-opacity-0 hover:bg-opacity-20 duration-500"
				>
					{isAuthenticated ? (
						<img src="/icons/navbar/shin-chan-pfp.png" className="w-8 h-8 rounded-full" />
					) : (
						<img src="/icons/navbar/unsigned-user-profile.png" className="w-7 h-7 rounded-full" />
					)}
				</div>
			</div>
			{isAuthModalOpen && (
				<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-20 cursor-pointer duration-500">
					<AuthModal onClose={handleAuthModalClose} />
				</div>
			)}
		</div>
	);
};

export default Navbar;
