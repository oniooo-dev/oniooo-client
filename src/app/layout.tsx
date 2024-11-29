import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-poppins',
})

export const metadata: Metadata = {
	title: "Oniooo",
	description: "Your new description here that accurately describes your website.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${poppins.variable} font-[300] text-[15px]`}>
			<head>
				<title>Oniooo</title>
				<meta name="description" content="Your new description here that accurately describes your website." />
				<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body>
				<script
					type="module"
					defer
					src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
				></script>
				{children}
			</body>
		</html>
	);
}