"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {

        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(139,92,246,0.5)] border-transparent",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_0_15px_rgba(16,185,129,0.4)] border-transparent",
            ghost: "hover:bg-accent hover:text-accent-foreground border-transparent",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-transparent",
            outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
        };

        const sizes = {
            sm: "h-9 px-3 rounded-md text-sm",
            md: "h-10 px-4 py-2 rounded-md",
            lg: "h-11 px-8 rounded-md text-lg",
            icon: "h-10 w-10 p-2 rounded-md",
        };

        return (
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...(props as any)}
                ref={ref}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
