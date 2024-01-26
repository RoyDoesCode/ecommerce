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
import { Size } from "@prisma/client";

const formSchema = zod.object({
    name: zod
        .string()
        .min(1, { message: "Name must contain at least 1 character." }),
    value: zod
        .string()
        .min(1, { message: "Value must contain at least 1 character." }),
});

type SizeFormValues = zod.infer<typeof formSchema>;

interface SizeFormProps {
    initialData: Size | null;
}

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const props = initialData
        ? {
              title: "Edit size",
              description: "Edit a size",
              toastMessage: "Size updated.",
              action: "Save changes",
          }
        : {
              title: "Create size",
              description: "Add a new size",
              toastMessage: "Size created.",
              action: "Create",
          };

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        },
    });

    const onValidSubmit = async (values: SizeFormValues) => {
        try {
            setLoading(true);

            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/sizes/${params.sizeId}`,
                    values
                );
            } else {
                await axios.post(`/api/${params.storeId}/sizes`, values);
            }

            router.push(`/${params.storeId}/sizes`);
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

            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
            router.push(`/${params.storeId}/sizes`);
            router.refresh();

            toast.success("Size deleted.");
        } catch (error) {
            toast.error(
                "Make sure you removed all products using this size first."
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
                                            placeholder="Size name"
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
                                        <Input
                                            disabled={loading}
                                            placeholder="Size value"
                                            {...field}
                                        />
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

export default SizeForm;
