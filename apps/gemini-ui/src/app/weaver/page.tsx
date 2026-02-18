"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BrainCircuit, Play, Square, Activity, GitBranch, Terminal, CheckCircle2, Loader2, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type LogStep = {
    agent: string;
    type: "info" | "process" | "success" | "warning";
    message: string;
};

export default function WeaverPage() {
    const [taskInput, setTaskInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [logs, setLogs] = useState<LogStep[]>([]);
    const [activeAgent, setActiveAgent] = useState<string | null>(null);

    const startWorkflow = async () => {
        if (!taskInput.trim()) return;

        setIsProcessing(true);
        setLogs([]);
        setActiveAgent("Supervisor");

        try {
            // Use the Next.js rewrite proxy to avoid CORS
            const res = await fetch("/api/weaver/start-workflow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task: taskInput }),
            });

            if (!res.ok) throw new Error("Failed to start workflow");

            const data = await res.json();
            const steps: LogStep[] = data.steps;

            // Simulate real-time execution by delaying the display of each step
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];

                // Update active agent visualization
                setActiveAgent(step.agent);

                // Add step to logs
                setLogs((prev) => [...prev, step]);

                // Dynamic delay based on step type
                const delay = step.type === "process" ? 1500 : 800;
                await new Promise((resolve) => setTimeout(resolve, delay));
            }

        } catch (error) {
            console.error(error);
            setLogs((prev) => [...prev, { agent: "System", type: "warning", message: "Workflow failed to execute." }]);
        } finally {
            setIsProcessing(false);
            setActiveAgent(null);
        }
    };

    const agentNodes = [
        { name: "Supervisor", icon: BrainCircuit, color: "text-violet-500", bg: "bg-violet-500/10" },
        { name: "Researcher", icon: SearchIcon, color: "text-blue-500", bg: "bg-blue-500/10" },
        { name: "Coder", icon: Terminal, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { name: "Reviewer", icon: ShieldCheckIcon, color: "text-rose-500", bg: "bg-rose-500/10" },
    ];

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
                        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
                            <BrainCircuit className="h-8 w-8" />
                            Weaver Engine
                        </h1>
                        <p className="text-muted-foreground">Autonomous agent orchestration and workflow management.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <span className={cn("inline-flex h-2 w-2 rounded-full", isProcessing ? "bg-emerald-500 animate-pulse" : "bg-slate-500")} />
                            <span className="text-sm font-medium text-muted-foreground">{isProcessing ? "Active Cycle" : "Idle"}</span>
                        </div>
                    </div>
                </div>

                {/* Task Input Area */}
                <Card className="p-6 border-primary/20 bg-primary/5">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Describe a task for the agent swarm (e.g., 'Analyze the security of app.py')..."
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                            disabled={isProcessing}
                            className="h-12 text-lg"
                            onKeyDown={(e) => e.key === "Enter" && startWorkflow()}
                        />
                        <Button
                            size="lg"
                            onClick={startWorkflow}
                            disabled={isProcessing || !taskInput.trim()}
                            className={cn("gap-2 min-w-[150px]", isProcessing ? "bg-emerald-600" : "")}
                        >
                            {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
                            {isProcessing ? "Running..." : "Start Agent"}
                        </Button>
                    </div>
                </Card>

                {/* Main Content Area */}
                <div className="grid gap-8 md:grid-cols-3 h-[600px]">
                    {/* Graph Visualizer */}
                    <Card className="md:col-span-2 relative overflow-hidden bg-black/40 border-primary/20 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

                        {/* Agent Nodes Visual */}
                        <div className="relative z-10 grid grid-cols-2 gap-12 p-12">
                            {agentNodes.map((node) => (
                                <motion.div
                                    key={node.name}
                                    animate={{
                                        scale: activeAgent === node.name ? 1.1 : 1,
                                        boxShadow: activeAgent === node.name ? "0 0 30px rgba(139, 92, 246, 0.3)" : "none",
                                        filter: activeAgent && activeAgent !== node.name ? "grayscale(0.8) opacity(0.5)" : "none"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={cn(
                                        "flex flex-col items-center justify-center h-32 w-32 rounded-2xl border-2 backdrop-blur-md transition-colors",
                                        activeAgent === node.name ? "border-primary bg-primary/20" : "border-border bg-card/50"
                                    )}
                                >
                                    <node.icon className={cn("h-8 w-8 mb-2", node.color)} />
                                    <span className="font-semibold text-sm">{node.name}</span>
                                    {activeAgent === node.name && (
                                        <span className="absolute -bottom-6 text-xs text-primary animate-pulse">Processing...</span>
                                    )}
                                </motion.div>
                            ))}

                            {/* Connecting Lines (Simplified for MVP) */}
                            <svg className="absolute inset-0 pointer-events-none opacity-20" style={{ zIndex: -1 }}>
                                <path d="M100 100 L 300 100" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                                <path d="M100 100 L 100 300" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                                <path d="M300 100 L 300 300" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                                <path d="M100 300 L 300 300" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                            </svg>
                        </div>
                    </Card>

                    {/* Activity Log */}
                    <Card className="md:col-span-1 flex flex-col h-full bg-slate-950/50">
                        <div className="p-4 border-b border-border bg-accent/10">
                            <h2 className="text-sm font-semibold flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
                                <Terminal className="h-4 w-4" /> Live Execution Logs
                            </h2>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-sm">
                            <AnimatePresence mode="popLayout">
                                {logs.length === 0 && !isProcessing && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-center text-muted-foreground py-10"
                                    >
                                        System Ready.<br />Waiting for task injection.
                                    </motion.div>
                                )}
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-3 items-start"
                                    >
                                        <div className="mt-0.5">
                                            {log.type === "info" && <Info className="h-4 w-4 text-blue-400" />}
                                            {log.type === "process" && <Loader2 className="h-4 w-4 text-violet-400 animate-spin" />}
                                            {log.type === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                                            {log.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-400" />}
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground mr-2">[{log.agent}]</span>
                                            <span className={cn(
                                                log.type === "warning" ? "text-amber-300" :
                                                    log.type === "success" ? "text-emerald-300" :
                                                        "text-slate-300"
                                            )}>
                                                {log.message}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}

function SearchIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}

function ShieldCheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
