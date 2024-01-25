"use client";

import React from "react";

import { DataTable } from "@/components/ui/dataTable";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";

interface OrderClientProps {
    data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey="products" />
        </>
    );
};

export default OrderClient;
