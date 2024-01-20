import { redirect } from "next/navigation";
import React from "react";

import useUser from "@/hooks/useUser";
import useStore from "@/hooks/useStore";

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userId = useUser();
    const store = await useStore(userId);

    if (store) {
        redirect(`/${store.id}`);
    }

    return <>{children}</>;
}
