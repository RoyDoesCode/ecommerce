import React, { useState } from "react";
import toast from "react-hot-toast";
import { Check, CheckCheck, Copy, Server } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
}

const variantTextMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
};

const badgeVariantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> =
    {
        public: "secondary",
        admin: "destructive",
    };

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant,
}) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(description);
        toast.success("API route copied to the clipboard.");

        setTimeout(() => setCopied(false), 5000);
    };

    return (
        <Alert>
            <Server className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={badgeVariantMap[variant]}>
                    {variantTextMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code
                    className="
                        relative 
                        rounded 
                        bg-muted 
                        px-[0.3rem] 
                        py-[0.2rem] 
                        font-mono 
                        text-sm 
                        font-semibold"
                >
                    {description}
                </code>
                <Button
                    variant={copied ? "secondary" : "outline"}
                    size="sm"
                    onClick={onCopy}
                    disabled={copied}
                >
                    {copied ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
            </AlertDescription>
        </Alert>
    );
};
