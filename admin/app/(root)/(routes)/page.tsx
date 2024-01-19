"use client";

import { useEffect } from "react";

import useStoreModalStore from "@/hooks/useStoreModalStore";

const SetupPage = () => {
    const onStoreModalOpen = useStoreModalStore((state) => state.onOpen);
    const isStoreModalOpen = useStoreModalStore((state) => state.isOpen);

    useEffect(() => {
        if (!isStoreModalOpen) {
            onStoreModalOpen();
        }
    }, [isStoreModalOpen, onStoreModalOpen]);

    return null;
};

export default SetupPage;
