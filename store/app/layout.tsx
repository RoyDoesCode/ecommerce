import type { Metadata } from "next";
import "./globals.css";

import { Urbanist } from "next/font/google";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ecommerce Store",
    description: "Ecommerce Store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={urbanist.className}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
