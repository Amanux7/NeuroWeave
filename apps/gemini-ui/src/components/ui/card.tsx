"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    gradient?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, gradient, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.3)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={cn(
                    "relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50",
                    gradient && "bg-gradient-to-br from-card to-accent/20",
                    className
                )}
                {...props}
            >
                {gradient && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity hover:opacity-100 pointer-events-none" />
                )}
                <div className="relative z-10">{children}</div>
            </motion.div>
        );
    }
);
Card.displayName = "Card";

export { Card };
