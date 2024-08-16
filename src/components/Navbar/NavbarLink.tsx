import React from "react";
import Link from "next/link";

interface NavbarLinkProps {
	href: string;
	iconUrl: string;
	selectedPage: string;
	onSelect: React.MouseEventHandler<HTMLDivElement>;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, iconUrl, selectedPage, onSelect }) => {
	return (
		<Link href={href}>
			<div
				className={`flex w-12 h-12 items-center justify-center
							rounded-lg bg-white ${selectedPage === href ? `bg-opacity-10` : `bg-opacity-0`} duration-500 hover:bg-opacity-10`}
				onClick={onSelect}
			>
				<img src={iconUrl} className="w-8 h-8" />
			</div>
		</Link>
	);
};

export default NavbarLink;
