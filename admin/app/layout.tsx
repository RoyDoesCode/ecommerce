import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import ModalProvider from "@/components/providers/modalProvider";
import ToastProvider from "@/components/providers/toastProvider";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ecommerce Admin Dashboard",
    description: "Ecommerce Admin Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ToastProvider />
                    <ModalProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
