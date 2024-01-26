import prismadb from "@/lib/prismadb";

export const getMissingStockCount = async (storeId: string) => {
    const stockCount = await prismadb.product.count({
        where: {
            storeId,
            isArchived: true,
        },
    });

    return stockCount;
};
