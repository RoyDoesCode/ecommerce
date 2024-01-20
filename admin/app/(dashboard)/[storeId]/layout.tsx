import React from "react";

import { Navbar } from "@/components/navbar";
import useUser from "@/hooks/useUser";
import useStore from "@/hooks/useStore";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string };
}) {
    const userId = useUser();
    const store = await useStore(userId, params.storeId);

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
