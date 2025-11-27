import "@/styles/globals.css";

import type { Metadata } from "next";
import { Quantico } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: "PacksOnPacks - Kö",
	description: "En kö för PacksOnPacks pack öppningar",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Quantico({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-geist",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en">
			<body>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}
