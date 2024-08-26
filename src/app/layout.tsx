import type { Metadata } from "next";
import "./globals.css";
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
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
