import { redirect } from "next/navigation";
import React from "react";

import useUser from "@/hooks/useUser";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userId = useUser();
    const store = await prismadb.store.findFirst({
        where: {
            userId,
        },
    });

    if (store) {
        redirect(`/${store.id}`);
    }

    return <>{children}</>;
}
