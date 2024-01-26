"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cellAction";
import Image from "next/image";

export type BillboardColumn = {
    id: string;
    label: string;
    imageUrl: string;
    createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "imageUrl",
        header: "Image",
        cell: ({ row }) => (
            <div
                className="
                    relative 
                    aspect-square 
                    h-10
                    w-10
                    overflow-hidden 
                    rounded-sm"
            >
                <Image
                    fill
                    sizes="100%"
                    src={row.original.imageUrl}
                    alt="Billboard Image"
                    className="object-cover object-center"
                />
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
