"use client";

import PreviewModal from "@/components/previewModal";
import useIsMounted from "@/hooks/useIsMounted";

const ModalProvider = () => {
    const isMounted = useIsMounted();

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <PreviewModal />
        </>
    );
};

export default ModalProvider;
