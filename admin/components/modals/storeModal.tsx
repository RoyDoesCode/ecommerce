"use client";

import React, { useState } from "react";
import zod from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useStoreModalStore from "@/hooks/useStoreModalStore";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = zod.object({
    name: zod
        .string()
        .min(1, { message: "Name must contain at least 1 character." }),
});

type StoreFormValues = zod.infer<typeof formSchema>;

const StoreModal = () => {
    const storeModalStore = useStoreModalStore();

    const [loading, setLoading] = useState(false);

    const form = useForm<StoreFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onValidSubmit = async (values: StoreFormValues) => {
        try {
            setLoading(true);

            const response = await axios.post("/api/stores", values);

            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModalStore.isOpen}
            onClose={storeModalStore.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onValidSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="E-commerce"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full items-center justify-end space-x-2 pt-6">
                                <Button
                                    disabled={loading}
                                    variant="outline"
                                    onClick={storeModalStore.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button disabled={loading} type="submit">
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default StoreModal;
