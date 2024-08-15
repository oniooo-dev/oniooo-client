import React from "react";
import Link from "next/link";

const Navbar = () => {
	return (
		<div className="flex flex-col h-screen justify-between gap-[5px] px-[14px] py-[20px]">
			<div className="flex flex-col w-full items-center gap-[5px]">
				<Link href="/melody">
					<div className="w-12 h-12 rounded-lg bg-white duration-500 hover:scale-[1.05]"></div>
				</Link>
				<Link href="/store">
					<div className="w-12 h-12 rounded-lg bg-white duration-500 hover:scale-[1.05]"></div>
				</Link>
			</div>
			<div className="flex flex-col w-full items-center gap-2">
				<div>
					<img 
						src={"https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png"} 
						className="w-10 h-10 rounded-full bg-white duration-500 hover:scale-[1.05]"
					/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
