import { create } from "zustand";

interface useStoreModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useStoreModalStore = create<useStoreModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useStoreModalStore;
