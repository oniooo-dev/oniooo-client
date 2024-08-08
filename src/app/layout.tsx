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
		<StoreProvider>
			<html lang="en">
				<body className="flex flex-row w-[100vw] h-[100vh] bg-black text-white">
					<Navbar />
					{children}
				</body>
			</html>
		</StoreProvider>
	);
}
