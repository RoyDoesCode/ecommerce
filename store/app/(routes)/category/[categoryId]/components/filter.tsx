"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React from "react";

import Button from "@/components/ui/button";
import { Color, Size } from "@/types";
import { cn } from "@/lib/utils";

interface FilterProps {
    valueKey: string;
    name: string;
    data: (Size | Color)[];
}

const Filter: React.FC<FilterProps> = ({ valueKey, name, data }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const handleClick = (id: string) => {
        const currentQuery = qs.parse(searchParams.toString());

        const query = {
            ...currentQuery,
            [valueKey]: id,
        };

        if (currentQuery[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true }
        );

        router.push(url, { scroll: false });
    };

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold">{name}</h3>
            <hr className="my-4" />
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flx items-center">
                        <Button
                            onClick={() => handleClick(filter.id)}
                            className={cn(
                                `rounded-md 
                                text-sm 
                                text-gray-800 
                                p-2 
                                bg-white 
                                border 
                                border-gray-300`,
                                selectedValue === filter.id &&
                                    "bg-black text-white"
                            )}
                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;
