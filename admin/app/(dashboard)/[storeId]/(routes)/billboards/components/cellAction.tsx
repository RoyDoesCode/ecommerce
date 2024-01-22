import React from "react";

import { BillboardColumn } from "./columns";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";

interface CellActionProps {
    data: BillboardColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild></DropdownMenuTrigger>
        </DropdownMenu>
    );
};

export default CellAction;
