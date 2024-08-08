import React from "react";
import Link from "next/link";
import { SiLivechat } from "react-icons/si";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { FaPaintbrush } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";

interface NavbarButtonProps {
	icon: React.FC;
	onClick: () => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ icon, onClick }) => {
	return <div onClick={onClick}></div>;
};

const Navbar = () => {
	return (
		<div className="flex flex-col h-screen items-center justify-between p-4 bg-gray-950">
			<div className="flex flex-col gap-2">
				<Link href={`/melody`}>
					<SiLivechat size={32} />
				</Link>
				<Link href={`/store`}>
					<RiCompassDiscoverFill size={32} />
				</Link>
			</div>
			<div className="flex flex-col gap-2">
				<FaPaintbrush size={32} />
				<Link href={`/store`}>
					<MdAccountCircle size={32} />
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
