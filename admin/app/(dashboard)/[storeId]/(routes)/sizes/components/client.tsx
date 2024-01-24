"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";
import { ApiList } from "@/components/ui/apiList";
import { SizeColumn, columns } from "./columns";

interface SizeClientProps {
    data: SizeColumn[];
}

const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage sizes for your store"
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/sizes/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="API calls for Sizes" />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    );
};

export default SizeClient;
