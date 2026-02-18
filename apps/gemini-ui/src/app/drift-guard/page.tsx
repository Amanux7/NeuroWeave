"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, RefreshCw, AlertTriangle, CheckCircle, Bug } from "lucide-react";

export default function DriftGuardPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-secondary flex items-center gap-2">
                            <ShieldCheck className="h-8 w-8" />
                            Drift-Guard Monitor
                        </h1>
                        <p className="text-muted-foreground">Real-time UI/Logic drift detection and self-healing systems.</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <RefreshCw className="h-4 w-4" /> Run Health Check
                    </Button>
                </div>

                {/* Health Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card gradient className="p-6 flex flex-col items-center justify-center text-center gap-2 border-emerald-500/20">
                        <CheckCircle className="h-12 w-12 text-emerald-500" />
                        <h3 className="text-2xl font-bold text-emerald-500">98%</h3>
                        <p className="text-sm text-muted-foreground">System Health Score</p>
                    </Card>
                    <Card className="p-6 flex flex-col items-center justify-center text-center gap-2">
                        <AlertTriangle className="h-12 w-12 text-amber-500" />
                        <h3 className="text-2xl font-bold text-amber-500">2</h3>
                        <p className="text-sm text-muted-foreground">Warnings Detected</p>
                    </Card>
                    <Card className="p-6 flex flex-col items-center justify-center text-center gap-2">
                        <Bug className="h-12 w-12 text-rose-500" />
                        <h3 className="text-2xl font-bold text-rose-500">0</h3>
                        <p className="text-sm text-muted-foreground">Critical Drifts</p>
                    </Card>
                </div>

                {/* Recent Checks */}
                <Card className="p-0 overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h3 className="font-semibold text-lg">Recent Integrity Checks</h3>
                    </div>
                    <div className="divide-y divide-border/50">
                        {[
                            { id: "DG-1042", target: "Weaver Graph", status: "Healthy", time: "2 min ago", color: "text-emerald-500" },
                            { id: "DG-1041", target: "Context DB", status: "Healthy", time: "5 min ago", color: "text-emerald-500" },
                            { id: "DG-1040", target: "Gemini UI", status: "Warning: Layout Shift", time: "12 min ago", color: "text-amber-500" },
                            { id: "DG-1039", target: "API Gateway", status: "Healthy", time: "15 min ago", color: "text-emerald-500" },
                        ].map((check) => (
                            <div key={check.id} className="p-4 flex items-center justify-between hover:bg-accent/20 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-xs text-muted-foreground bg-accent px-2 py-1 rounded">{check.id}</span>
                                    <span className="font-medium">{check.target}</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className={`text-sm font-medium ${check.color}`}>{check.status}</span>
                                    <span className="text-sm text-muted-foreground w-20 text-right">{check.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-accent/10 text-center">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">View Full Logs</Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
