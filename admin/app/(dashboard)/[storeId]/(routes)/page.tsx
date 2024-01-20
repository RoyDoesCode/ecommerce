import React from "react";

import prismadb from "@/lib/prismadb";
import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";

interface DashboardPageProps {
    params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
    const userId = useUser();
    const store = await useStore(userId, params.storeId);

    return <div>Active Store: {store!.name}</div>;
};

export default DashboardPage;
