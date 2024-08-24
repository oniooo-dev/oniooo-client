import React from "react";
import Link from "next/link";

interface NavbarLinkProps {
	href: string;
	iconUrl: string;
	selectedPage: string;
	onSelect: React.MouseEventHandler<HTMLDivElement>;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, iconUrl, selectedPage, onSelect }) => {

	const iconScale = href === "/melody" ? "w-[26px] h-[26px]" : "w-7 h-7";

	return (
		<Link href={href}>
			<div
				className={`flex w-11 h-11 items-center justify-center
							rounded-lg bg-white ${selectedPage === href ? `bg-opacity-20` : `bg-opacity-0`} duration-300 hover:bg-opacity-20`}
				onClick={onSelect}
			>
				<img src={iconUrl} className={iconScale} />
			</div>
		</Link>
	);
};

export default NavbarLink;
