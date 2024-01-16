"use client";

import React from "react";
import Modal from "@/components/ui/modal";
import useStoreModalStore from "@/hooks/useStoreModal";

const StoreModal = () => {
    const storeModalStore = useStoreModalStore();

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModalStore.isOpen}
            onClose={storeModalStore.onClose}
        >
            Create store form
        </Modal>
    );
};

export default StoreModal;
