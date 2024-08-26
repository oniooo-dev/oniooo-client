import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "@/store/StoreProvider";

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
			<html lang="en">
				<body>
					<StoreProvider>
						<div className="flex flex-row bg-black text-white w-screen h-screen">
							<Navbar />
							{children}
						</div>
					</StoreProvider>
				</body>
			</html>
	);
}
