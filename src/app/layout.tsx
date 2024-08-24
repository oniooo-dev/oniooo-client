import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "@/store/StoreProvider";
import OtherNavbar from "@/components/Navbar/OtherNavbar";

export const metadata: Metadata = {
	title: "Oniooo",
	description: "Oniooo",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<StoreProvider>
			<html lang="en">
				<body className="flex flex-row w-[100vw] h-[100vh] overflow-hidden bg-black text-white">
					<Navbar />
					<div className={`w-[1px] bg-gray-300 bg-opacity-20 z-10`}></div>
					{/* <div className="md:hidden">
						<OtherNavbar />
					</div> */}
					{children}
				</body>
			</html>
		</StoreProvider>
	);
}
