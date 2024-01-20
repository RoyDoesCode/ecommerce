import React, { useEffect, useState } from "react";

const useOrigin = () => {
    const [isMounted, setIsMounted] = useState(false);

    const origin = window?.location?.origin ?? "";

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted ? origin : "";
};

export default useOrigin;
