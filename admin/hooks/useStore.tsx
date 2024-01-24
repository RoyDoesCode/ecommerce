import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

const useStore = async (userId: string, storeId: string) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId,
        },
    });

    if (!store) {
        redirect("/");
    }

    return store;
};

export default useStore;
