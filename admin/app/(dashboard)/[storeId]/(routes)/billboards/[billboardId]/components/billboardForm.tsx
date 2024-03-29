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
import { ImageUpload } from "@/components/ui/imageUpload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";

const formSchema = zod.object({
    label: zod
        .string()
        .min(1, { message: "Label must contain at least 1 character." }),
    imageUrl: zod
        .string()
        .min(1, { message: "Billboards must have an image." }),
});

type BillboardFormValues = zod.infer<typeof formSchema>;

interface BillboardFormProps {
    initialData: Billboard | null;
}

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const props = initialData
        ? {
              title: "Edit billboard",
              description: "Edit a billboard",
              toastMessage: "Billboard updated.",
              action: "Save changes",
          }
        : {
              title: "Create billboard",
              description: "Add a new billboard",
              toastMessage: "Billboard created.",
              action: "Create",
          };

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: "",
        },
    });

    const onValidSubmit = async (values: BillboardFormValues) => {
        try {
            setLoading(true);

            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/billboards/${params.billboardId}`,
                    values
                );
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, values);
            }

            router.push(`/${params.storeId}/billboards`);
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
                `/api/${params.storeId}/billboards/${params.billboardId}`
            );
            router.push(`/${params.storeId}/billboards`);
            router.refresh();

            toast.success("Billboard deleted.");
        } catch (error) {
            toast.error(
                "Make sure you removed all categories using this billboard first."
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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        imageUrls={
                                            field.value ? [field.value] : []
                                        }
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Billboard label"
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

export default BillboardForm;
