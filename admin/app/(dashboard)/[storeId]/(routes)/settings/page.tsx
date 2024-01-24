import React from "react";

import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";

import SettingsForm from "./components/settingsForm";

interface SettingsPageProps {
    params: { storeId: string };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
    const userId = useUser();
    const store = await useStore(userId, params.storeId);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
};

export default SettingsPage;
