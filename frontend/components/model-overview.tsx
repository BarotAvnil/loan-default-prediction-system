import {
    Brain,
    Target,
    Settings,
    BarChart4,
    CheckCircle2,
    AlertTriangle
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ModelOverview() {
    return (
        <section className="w-full max-w-6xl px-0 py-0 mx-auto mt-0 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Model Information */}
                <Card className="md:col-span-2 border-primary/20 bg-primary/5 backdrop-blur-xl shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Brain className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Model Information</CardTitle>
                        </div>
                        <CardDescription>System Architecture & Classification Type</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1">
                            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Model Name</p>
                            <p className="font-bold text-foreground">Optimized Random Forest</p>
                            <Badge variant="outline" className="mt-1 border-primary/20 bg-primary/5 text-primary">Class Balancing</Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Problem Type</p>
                            <p className="font-bold text-foreground">Binary Classification</p>
                            <p className="text-xs text-muted-foreground">Loan Default Prediction</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Target Variable</p>
                            <p className="font-bold text-foreground">Loan Default Status</p>
                            <p className="text-xs text-muted-foreground">0 = Non-Default, 1 = Default</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Training & Evaluation Details */}
                <Card className="bg-card dark:bg-black/40 backdrop-blur-xl border-border dark:border-white/10 shadow-xl">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Settings className="h-5 w-5 text-blue-500" />
                            </div>
                            <CardTitle className="text-xl">Training Details</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center border-b border-border/40 dark:border-white/5 pb-2">
                            <span className="text-sm text-muted-foreground font-mono">Dataset Type</span>
                            <span className="font-medium text-right text-foreground dark:text-gray-200">Structured Tabular</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/40 dark:border-white/5 pb-2">
                            <span className="text-sm text-muted-foreground font-mono">Input Features</span>
                            <span className="font-medium text-foreground dark:text-gray-200">16 Features</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/40 dark:border-white/5 pb-2">
                            <span className="text-sm text-muted-foreground font-mono">Class Balance</span>
                            <span className="font-medium text-foreground dark:text-gray-200">Balanced Weights</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground font-mono">Preprocessing</span>
                            <span className="font-medium text-foreground dark:text-gray-200">StandardScaler</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Model Performance */}
                <Card className="bg-card dark:bg-black/40 backdrop-blur-xl border-border dark:border-white/10 shadow-xl">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <BarChart4 className="h-5 w-5 text-green-500" />
                            </div>
                            <CardTitle className="text-xl">Performance Metrics</CardTitle>
                        </div>
                        <CardDescription>Metrics on final validation set</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center p-3 bg-secondary/30 dark:bg-white/5 rounded-lg border border-border dark:border-white/5 hover:bg-secondary/50 dark:hover:bg-white/10 transition-colors">
                                <span className="text-2xl font-bold text-primary">73%</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Accuracy</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-secondary/30 dark:bg-white/5 rounded-lg border border-border dark:border-white/5 hover:bg-secondary/50 dark:hover:bg-white/10 transition-colors">
                                <span className="text-2xl font-bold text-primary">62%</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Recall</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-secondary/30 dark:bg-white/5 rounded-lg border border-border dark:border-white/5 hover:bg-secondary/50 dark:hover:bg-white/10 transition-colors">
                                <span className="text-2xl font-bold text-primary">24%</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Precision</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-secondary/30 dark:bg-white/5 rounded-lg border border-border dark:border-white/5 hover:bg-secondary/50 dark:hover:bg-white/10 transition-colors">
                                <span className="text-2xl font-bold text-primary">0.35</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">F1-Score</span>
                            </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-4 font-mono">
                            CV_MEAN_F1: 0.34
                        </p>
                    </CardContent>
                </Card>

                {/* Selection Rationale */}
                <Card className="bg-card dark:bg-black/40 backdrop-blur-xl border-border dark:border-white/10 shadow-xl">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-orange-500/10 rounded-lg">
                                <Target className="h-5 w-5 text-orange-500" />
                            </div>
                            <CardTitle className="text-xl">Selection Rationale</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 group">
                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 transition-transform group-hover:scale-110" />
                                <span className="text-sm text-foreground/80 dark:text-gray-300">Best balance between recall and precision.</span>
                            </li>
                            <li className="flex items-start gap-2 group">
                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 transition-transform group-hover:scale-110" />
                                <span className="text-sm text-foreground/80 dark:text-gray-300">High stability across cross-validation.</span>
                            </li>
                            <li className="flex items-start gap-2 group">
                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 transition-transform group-hover:scale-110" />
                                <span className="text-sm text-foreground/80 dark:text-gray-300">Effectively identifies high number of defaulters.</span>
                            </li>
                            <li className="flex items-start gap-2 group">
                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 transition-transform group-hover:scale-110" />
                                <span className="text-sm text-foreground/80 dark:text-gray-300">Optimized for imbalanced financial data.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Prediction Output Explanation */}
                <Card className="bg-card dark:bg-black/40 backdrop-blur-xl border-l-4 border-l-yellow-500 border-t-border dark:border-t-white/10 border-r-border dark:border-r-white/10 border-b-border dark:border-b-white/10 shadow-xl">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            </div>
                            <CardTitle className="text-xl">Interpreting Predictions</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-xl bg-green-500/10 border-green-500/20">
                                <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Low Risk</p>
                                <p className="text-sm text-muted-foreground">Low probability of default. Safe to proceed.</p>
                            </div>
                            <div className="p-4 border rounded-xl bg-red-500/10 border-red-500/20">
                                <p className="font-semibold text-red-600 dark:text-red-500 mb-1">High Risk</p>
                                <p className="text-sm text-muted-foreground">High probability of default. Caution advised.</p>
                            </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground text-center font-mono">
                            * THRESHOLD_CALIBRATED_DURING_TRAINING
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
