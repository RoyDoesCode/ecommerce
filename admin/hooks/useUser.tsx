import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

const useUser = () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return userId;
};

export default useUser;
