import { UserButton } from "@clerk/nextjs";
import React from "react";

import { MainNav } from "@/components/mainNav";
import { StoreSwitcher } from "@/components/storeSwitcher";
import prismadb from "@/lib/prismadb";
import useUser from "@/hooks/useUser";

export const Navbar = async () => {
    const userId = useUser();

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />

                <MainNav className="mx-6" />

                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};
