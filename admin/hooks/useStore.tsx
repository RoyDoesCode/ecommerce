import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

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
