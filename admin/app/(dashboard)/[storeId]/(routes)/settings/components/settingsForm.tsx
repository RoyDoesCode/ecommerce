"use client";

import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alertModal";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface SettingsFormProps {
    initialData: Store;
}

const formSchema = zod.object({
    name: zod
        .string()
        .min(1, { message: "Name must contain at least 1 character." }),
});

type SettingsFormValues = zod.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onValidSubmit = async (values: SettingsFormValues) => {
        try {
            setLoading(true);

            await axios.patch(`/api/stores/${params.storeId}`, values);
            router.refresh();

            toast.success("Store updated.");
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");

            toast.success("Store deleted.");
        } catch (error) {
            toast.error(
                "Make sure you removed all products and categories first."
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
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteModalOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
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
                                            placeholder="Store name"
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
                        Save Changes
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default SettingsForm;
