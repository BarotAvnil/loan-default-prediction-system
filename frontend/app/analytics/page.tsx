"use client";

import { Navbar } from "@/components/navbar";
import { ModelOverview } from "@/components/model-overview";
import { ModelComparison } from "@/components/model-comparison";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary/20">
            <Navbar />

            {/* Dynamic Background Gradient */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:14px_24px] opacity-20">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            <main className="flex-1 flex flex-col px-4 pt-32 pb-4">
                <div className="w-full max-w-6xl mx-auto space-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    <Tabs defaultValue="overview" className="w-full">
                        <div className="flex justify-center mb-2">
                            <TabsList className="grid w-full max-w-md grid-cols-2 h-auto p-1 bg-background/60 backdrop-blur-xl border border-primary/10 rounded-full">
                                <TabsTrigger value="overview" className="rounded-full py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                                    Model Overview
                                </TabsTrigger>
                                <TabsTrigger value="comparison" className="rounded-full py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs">
                                    Comparison Benchmarks
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="overview" className="space-y-2 focus-visible:ring-0">
                            <ModelOverview />
                        </TabsContent>
                        <TabsContent value="comparison" className="space-y-2 focus-visible:ring-0">
                            <ModelComparison />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
