"use client";

import { useState } from "react";
import {
    BarChart3,
    CheckCircle2,
    Trophy,
    Info,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Terminal,
    XCircle,
    TrendingUp
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModelData {
    id: string;
    name: string;
    type: string;
    imbalanceHandling: string;
    isBalanced: boolean;
    metrics: {
        accuracy: number;
        precision: number;
        recall: number;
        f1: number;
        meanCvF1?: number;
    };
    observation: string;
    isFinal?: boolean;
    techniques?: string[];
}

const models: ModelData[] = [
    {
        id: "log_reg_base",
        name: "1. Logistic Regression (Baseline)",
        type: "Logistic Regression (Binary Classifier)",
        imbalanceHandling: "Not handled (baseline)",
        isBalanced: false,
        metrics: { accuracy: 88.5, precision: 62, recall: 3, f1: 0.05 },
        observation: "High accuracy but fails to detect defaulters. Not suitable for imbalanced data."
    },
    {
        id: "log_reg_bal",
        name: "2. Logistic Regression (Balanced)",
        type: "Logistic Regression with Class Weight Balancing",
        imbalanceHandling: "class_weight = balanced",
        isBalanced: true,
        metrics: { accuracy: 68, precision: 22, recall: 69, f1: 0.33 },
        observation: "Improved recall significantly, but lower precision."
    },
    {
        id: "dt_tree",
        name: "3. Decision Tree Classifier",
        type: "Decision Tree (Depth-limited)",
        imbalanceHandling: "Balanced class weights",
        isBalanced: true,
        metrics: { accuracy: 67, precision: 21, recall: 65, f1: 0.31 },
        observation: "Interpretable model but less stable and lower F1-score."
    },
    {
        id: "rf_init",
        name: "4. Random Forest (Initial)",
        type: "Random Forest Classifier",
        imbalanceHandling: "Not optimized",
        isBalanced: false,
        metrics: { accuracy: 89, precision: 67, recall: 3, f1: 0.06 },
        observation: "High accuracy but poor default detection."
    },
    {
        id: "rf_bal_tuned",
        name: "5. Random Forest (Balanced & Tuned)",
        type: "Random Forest with Class Balancing",
        imbalanceHandling: "Balanced",
        isBalanced: true,
        metrics: { accuracy: 70, precision: 23, recall: 66, f1: 0.34 },
        observation: "Strong improvement after balancing and tuning."
    },
    {
        id: "rf_final",
        name: "6. Optimized Random Forest — FINAL",
        type: "Optimized Random Forest Classifier",
        imbalanceHandling: "Balanced & Tuned",
        isBalanced: true,
        metrics: { accuracy: 73, precision: 24, recall: 62, f1: 0.35, meanCvF1: 0.34 },
        observation: "Best overall balance between recall, precision, and stability. Selected as final model.",
        isFinal: true,
        techniques: ["GridSearchCV", "Class Weight Balancing", "Feature Scaling", "Cross-Validation"]
    },
    {
        id: "gb_clf",
        name: "7. Gradient Boosting Classifier",
        type: "Gradient Boosting",
        imbalanceHandling: "Limited",
        isBalanced: false,
        metrics: { accuracy: 89, precision: 66, recall: 5, f1: 0.10 },
        observation: "Very poor recall for defaulters. Not suitable."
    },
    {
        id: "ada_clf",
        name: "8. AdaBoost Classifier",
        type: "AdaBoost",
        imbalanceHandling: "Limited",
        isBalanced: false,
        metrics: { accuracy: 89, precision: 62, recall: 5, f1: 0.09 },
        observation: "Performs similar to Gradient Boosting with poor default detection."
    }
];

export function ModelComparison() {
    const [expandedModel, setExpandedModel] = useState<string | null>("rf_final");

    return (
        <section className="w-full max-w-6xl px-0 py-0 mx-auto space-y-4 bg-transparent">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Chart Section */}
                <Card className="lg:col-span-2 rounded-xl border border-primary/20 bg-blue-50/80 dark:bg-primary/5 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.05)]">
                    <CardHeader className="border-b border-primary/10 pb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <BarChart3 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-foreground text-lg font-semibold">Performance Benchmarks</CardTitle>
                                <CardDescription className="text-muted-foreground text-sm mt-0.5">Accuracy vs. Recall (Defaulter Detection)</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                        {models.map((model) => (
                            <div
                                key={model.id}
                                className={cn(
                                    "space-y-2.5 p-3 rounded-lg transition-all border",
                                    model.isFinal
                                        ? "bg-indigo-50 border-indigo-200 shadow-sm"
                                        : "bg-white/60 border-primary/10 hover:border-primary/20 hover:bg-white/80"
                                )}
                            >
                                <div className="flex justify-between items-center">
                                    <span className={cn(
                                        "text-base font-semibold tracking-tight font-mono flex items-center gap-2",
                                        model.isFinal ? "text-indigo-700" : "text-foreground"
                                    )}>
                                        {model.name}
                                        {model.isFinal && <Trophy className="h-3.5 w-3.5 text-amber-500" />}
                                    </span>
                                    {model.isBalanced
                                        ? <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">BALANCED</span>
                                        : <span className="text-xs font-mono font-bold text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">UNBALANCED</span>
                                    }
                                </div>

                                {/* Accuracy Bar */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                        <span>Accuracy</span>
                                        <span className="font-semibold text-sm text-foreground">{model.metrics.accuracy}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full transition-all", model.isFinal ? "bg-indigo-400" : "bg-primary/30")}
                                            style={{ width: `${model.metrics.accuracy}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Recall Bar */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                        <span>Recall (Default Class)</span>
                                        <span className={cn("font-semibold text-sm", model.metrics.recall >= 60 ? "text-emerald-600" : model.metrics.recall >= 20 ? "text-amber-600" : "text-red-500")}>
                                            {model.metrics.recall}%
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all",
                                                model.isFinal ? "bg-emerald-500" :
                                                    model.metrics.recall >= 60 ? "bg-emerald-400" :
                                                        model.metrics.recall >= 20 ? "bg-amber-400" : "bg-red-400"
                                            )}
                                            style={{ width: `${model.metrics.recall}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Details Section */}
                <div className="space-y-6">
                    <Card className="rounded-xl border border-primary/20 bg-blue-50/80 dark:bg-primary/5 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.05)] h-fit sticky top-24">
                        <CardHeader className="border-b border-primary/10 pb-4">
                            <CardTitle className="text-foreground text-lg font-semibold">Model Insights</CardTitle>
                            <CardDescription className="text-muted-foreground text-sm">Detailed analysis of each approach</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 pt-3">
                            {models.map((model) => (
                                <div
                                    key={model.id}
                                    className={cn(
                                        "rounded-lg border overflow-hidden",
                                        model.isFinal ? "border-indigo-200" : "border-primary/10"
                                    )}
                                >
                                    <button
                                        onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors",
                                            model.isFinal
                                                ? "bg-indigo-50 hover:bg-indigo-100"
                                                : "bg-white/40 hover:bg-white/60"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-sm font-semibold font-mono line-clamp-1",
                                            model.isFinal ? "text-indigo-700" : "text-foreground"
                                        )}>
                                            {model.name}
                                        </span>
                                        {expandedModel === model.id
                                            ? <ChevronUp className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-1" />
                                            : <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-1" />
                                        }
                                    </button>

                                    {expandedModel === model.id && (
                                        <div className="p-3 space-y-3 text-xs bg-white/40 border-t border-primary/10 animate-in slide-in-from-top-1">
                                            <div className="space-y-0.5">
                                                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">Model Type</span>
                                                <p className="text-slate-700 font-medium text-sm">{model.type}</p>
                                            </div>

                                            <div className="space-y-0.5">
                                                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">Imbalance Handling</span>
                                                <div className="flex items-center gap-1.5">
                                                    {model.isBalanced
                                                        ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                                        : <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                                                    }
                                                    <p className={cn("font-medium text-sm", model.isBalanced ? "text-emerald-700" : "text-red-600")}>
                                                        {model.imbalanceHandling}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-0.5">
                                                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">Observation</span>
                                                <p className="text-slate-500 italic border-l-2 border-slate-300 pl-2 leading-relaxed text-sm">
                                                    {model.observation}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 pt-1">
                                                <div className={cn("p-2 rounded-lg text-center border", model.isFinal ? "bg-indigo-50 border-indigo-200" : "bg-white/60 border-primary/10")}>
                                                    <span className="block text-xs text-slate-400 font-mono uppercase mb-0.5">F1-Score</span>
                                                    <span className={cn("font-bold text-base", model.isFinal ? "text-indigo-600" : "text-slate-700")}>
                                                        {model.metrics.f1}
                                                    </span>
                                                </div>
                                                <div className={cn("p-2 rounded-lg text-center border", model.isFinal ? "bg-indigo-50 border-indigo-200" : "bg-white/60 border-primary/10")}>
                                                    <span className="block text-xs text-slate-400 font-mono uppercase mb-0.5">Precision</span>
                                                    <span className={cn("font-bold text-base", model.isFinal ? "text-indigo-600" : "text-slate-700")}>
                                                        {model.metrics.precision}%
                                                    </span>
                                                </div>
                                            </div>

                                            {model.techniques && (
                                                <div className="space-y-1.5 pt-1">
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">Techniques</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {model.techniques.map(t => (
                                                            <span key={t} className="text-xs font-mono bg-indigo-100 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Final Selection Summary */}
            <div className="rounded-xl border border-primary/20 bg-blue-50/80 dark:bg-primary/5 backdrop-blur-md overflow-hidden shadow-lg">
                {/* Header bar */}
                <div className="bg-indigo-600 px-5 py-3 flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-bold tracking-widest flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5" />
                        SYSTEM_LOG — FINAL MODEL SELECTION
                    </span>
                    <div className="flex gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-white/30" />
                        <div className="h-2 w-2 rounded-full bg-white/50" />
                        <div className="h-2 w-2 rounded-full bg-white/80" />
                    </div>
                </div>

                <div className="p-6 space-y-5">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 mt-0.5 shrink-0">
                            <Trophy className="h-6 w-6 text-amber-500" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-bold text-slate-900 tracking-tight font-mono">
                                OPTIMIZED RANDOM FOREST
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Selected as the optimal model for deployment. While standard boosting algorithms achieved higher raw accuracy (89%), they failed to capture risk entities — Recall of only ~5%.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {[
                            { label: "Accuracy", value: "73%", color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200" },
                            { label: "Recall", value: "62%", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
                            { label: "Precision", value: "24%", color: "text-sky-600", bg: "bg-sky-50 border-sky-200" },
                            { label: "F1-Score", value: "0.35", color: "text-violet-600", bg: "bg-violet-50 border-violet-200" },
                        ].map(stat => (
                            <div key={stat.label} className={cn("rounded-lg border p-3 text-center", stat.bg)}>
                                <span className="block text-[10px] text-slate-400 font-mono uppercase font-bold mb-1">{stat.label}</span>
                                <span className={cn("text-lg font-bold font-mono", stat.color)}>{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white/60 border border-primary/10 rounded-lg p-4 text-xs text-muted-foreground leading-relaxed font-mono">
                        <span className="text-indigo-600 font-bold">RATIONALE:</span>{" "}
                        The Optimized Random Forest provides the{" "}
                        <span className="text-slate-800 font-bold">best stability matrix</span>.
                        By prioritizing Recall (62%), we minimize critical failure points (missed defaults) while
                        maintaining acceptable precision thresholds. Cross-validation F1 of 0.34 confirms generalizability.
                    </div>
                </div>
            </div>
        </section>
    );
}