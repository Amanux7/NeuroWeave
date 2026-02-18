"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, ShieldCheck, Database, Code2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Weaver Engine",
      description: "Autonomous task orchestration and multi-agent workflow management.",
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      href: "/weaver",
    },
    {
      title: "Drift-Guard",
      description: "Self-healing QA system that detects and fixes UI/Logic drift in real-time.",
      icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
      href: "/drift-guard",
    },
    {
      title: "Context-Bridge",
      description: "Vector-based memory system for long-term agent context retention.",
      icon: <Database className="h-8 w-8 text-blue-500" />,
      href: "/context-bridge",
    },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 text-center md:px-6">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <span>v1.0.0 Beta Available</span>
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            The <span className="text-primary">Neural Backbone</span> for
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Autonomous Agents
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            NeuroWeave orchestrates, heals, and remembers. Build resilient multi-agent systems with self-correcting capabilities.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 mt-4">
            <Link href="/weaver">
              <Button size="lg" className="group">
                Launch Weaver
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => window.open('https://github.com/neuroweave', '_blank')}>
              View Documentation
            </Button>
          </div>
        </motion.div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-10 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-0 right-10 -z-10 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href} className="block h-full">
              <Card gradient className="h-full flex flex-col items-start gap-4 hover:border-primary/50 cursor-pointer">
                <div className="rounded-lg bg-accent p-3 ring-1 ring-border">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Code Snippet Section */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Code2 className="h-32 w-32" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Developer First</h2>
              <p className="text-muted-foreground">
                Built with a modular architecture in mind. Extend capabilities with
                <span className="text-primary"> Python</span> engines and
                <span className="text-secondary"> TypeScript</span> bridges.
              </p>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Docker-first deployment
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  LangGraph orchestration
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Next.js 16 frontend
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-black/50 p-4 font-mono text-xs text-green-400 border border-border/50 shadow-2xl">
              <p>$ docker-compose up --build</p>
              <p className="text-gray-500">Building weaver...</p>
              <p className="text-gray-500">Building drift-guard...</p>
              <p className="text-gray-500">Building context-bridge...</p>
              <p className="text-white mt-2">✔ NeuroWeave Ecosystem Online</p>
              <p className="text-blue-400">➜ UI: http://localhost:3000</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
