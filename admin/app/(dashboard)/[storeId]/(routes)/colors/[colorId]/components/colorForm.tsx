"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import zod from "zod";

import { AlertModal } from "@/components/modals/alertModal";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";

const formSchema = zod.object({
    name: zod
        .string()
        .min(1, { message: "Name must contain at least 1 character." }),
    value: zod
        .string()
        .min(1, { message: "Value must contain at least 1 character." }),
});

type ColorFormValues = zod.infer<typeof formSchema>;

interface ColorFormProps {
    initialData: Color | null;
}

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const props = initialData
        ? {
              title: "Edit color",
              description: "Edit a color",
              toastMessage: "Color updated.",
              action: "Save changes",
          }
        : {
              title: "Create color",
              description: "Add a new color",
              toastMessage: "Color created.",
              action: "Create",
          };

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        },
    });

    const onValidSubmit = async (values: ColorFormValues) => {
        try {
            setLoading(true);

            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/colors/${params.colorId}`,
                    values
                );
            } else {
                await axios.post(`/api/${params.storeId}/colors`, values);
            }

            router.push(`/${params.storeId}/colors`);
            router.refresh();
            toast.success(props.toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(
                `/api/${params.storeId}/colors/${params.colorId}`
            );
            router.push(`/${params.storeId}/colors`);
            router.refresh();

            toast.success("Color deleted.");
        } catch (error) {
            toast.error(
                "Make sure you removed all products using this color first."
            );
        } finally {
            setLoading(false);
            setDeleteModalOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={deleteModalOpen}
                loading={loading}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={onDelete}
            />

            <div className="flex items-center justify-between">
                <Heading title={props.title} description={props.description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteModalOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onValidSubmit)}
                    className="w-full space-y-8"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Color name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Color value"
                                                {...field}
                                            />
                                            <div
                                                className="rounded-full border p-4"
                                                style={{
                                                    backgroundColor:
                                                        field.value,
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {props.action}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ColorForm;
