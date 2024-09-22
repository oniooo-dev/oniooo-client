import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { Poppins } from 'next/font/google'

export const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-poppins',
})

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
		<html lang="en" className={`${poppins.variable} font-[400] text-[13px]`}>
			<body>
				<script
					type="module"
					defer
					src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
				></script>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
