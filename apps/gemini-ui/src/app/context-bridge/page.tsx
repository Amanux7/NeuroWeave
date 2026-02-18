"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } = "@/components/ui/card";
import { Database, Search, HardDrive, Cpu, Network, Loader2, FileText, Brain, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchResult = {
    id: string;
    text: string;
    score: number;
    type: "doc" | "memory" | "log" | "code";
};

export default function ContextBridgePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setResults([]); // Clear previous results

        try {
            // Use proxy rewrite
            const res = await fetch(`/api/context-bridge/search?q=${encodeURIComponent(searchQuery)}`);
            if (!res.ok) throw new Error("Search failed");

            const data = await res.json();
            setResults(data.results);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "doc": return <FileText className="h-4 w-4" />;
            case "memory": return <Brain className="h-4 w-4" />;
            case "log": return <Terminal className="h-4 w-4" />;
            default: return <Database className="h-4 w-4" />;
        }
    };

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
                        <h1 className="text-3xl font-bold tracking-tight text-blue-500 flex items-center gap-2">
                            <Database className="h-8 w-8" />
                            Context-Bridge
                        </h1>
                        <p className="text-muted-foreground">Vector memory system and knowledge retrieval interface.</p>
                    </div>
                    <div className="w-full max-w-sm flex items-center gap-2">
                        <div className="relative flex-1">
                            {isSearching ? (
                                <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                            ) : (
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            )}
                            <Input
                                className="pl-9"
                                placeholder="Search vector memory..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                disabled={isSearching}
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { label: "Vector Count", value: "12,405", icon: <Network className="h-4 w-4" />, color: "text-blue-400" },
                        { label: "Storage Used", value: "1.2 GB", icon: <HardDrive className="h-4 w-4" />, color: "text-purple-400" },
                        { label: "Query Latency", value: "45ms", icon: <Cpu className="h-4 w-4" />, color: "text-emerald-400" },
                        { label: "Cache Hit Rate", value: "94%", icon: <ActivityIcon className="h-4 w-4" />, color: "text-orange-400" },
                    ].map((stat, i) => (
                        <Card key={i} className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                            <div className={`p-2 rounded-full bg-accent/50 ${stat.color}`}>{stat.icon}</div>
                        </Card>
                    ))}
                </div>

                {/* Memory View */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 p-0 overflow-hidden border-blue-500/20 flex flex-col min-h-[400px]">
                        <div className="p-4 border-b border-border bg-accent/20 flex justify-between items-center">
                            <h3 className="font-semibold text-blue-400 flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                {results.length > 0 ? "Search Results" : "Recent Vectors"}
                            </h3>
                        </div>
                        <div className="p-4 space-y-4 flex-1">
                            <AnimatePresence mode="popLayout">
                                {results.length === 0 && !isSearching && (
                                    <div className="text-center text-muted-foreground py-10 opacity-50">
                                        Try searching for "architecture", "logs", or "user preferences".
                                    </div>
                                )}
                                {results.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-3 bg-background/50 rounded-lg border border-border/50 hover:border-blue-500/50 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-mono text-xs text-muted-foreground">{item.id}</span>
                                            <div className="flex items-center gap-2">
                                                <span className={cn(
                                                    "text-xs px-2 py-0.5 rounded-full flex items-center gap-1",
                                                    item.type === "doc" && "bg-blue-500/10 text-blue-400",
                                                    item.type === "memory" && "bg-purple-500/10 text-purple-400",
                                                    item.type === "log" && "bg-emerald-500/10 text-emerald-400",
                                                    item.type === "code" && "bg-orange-500/10 text-orange-400",
                                                )}>
                                                    {getTypeIcon(item.type)} {item.type}
                                                </span>
                                                <span className="text-xs text-emerald-500 font-mono">{(item.score * 100).toFixed(0)}% match</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-foreground/80 line-clamp-2 group-hover:text-foreground transition-colors">
                                            "{item.text}"
                                        </p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </Card>

                    <Card className="md:col-span-1 p-4 bg-muted/20">
                        <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider">Memory Banks</h3>
                        <div className="space-y-3">
                            {[
                                { name: "Long-term Core", size: "850 MB" },
                                { name: "Session Ephemeral", size: "120 MB" },
                                { name: "User Preferences", size: "5 MB" },
                                { name: "Codebase Semantic", size: "230 MB" },
                            ].map((bank) => (
                                <div key={bank.name} className="flex justify-between items-center p-2 rounded hover:bg-accent/40 cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                        <span className="text-sm font-medium">{bank.name}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono">{bank.size}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-border">
                            <Button variant="outline" className="w-full text-xs h-8">Connect External DB</Button>
                        </div>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}

function ActivityIcon(props: any) {
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
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}
