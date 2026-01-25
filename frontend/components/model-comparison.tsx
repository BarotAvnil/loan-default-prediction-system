"use client";

import { useState } from "react";
import {
    BarChart3,
    CheckCircle2,
    Trophy,
    Info,
    ChevronDown,
    ChevronUp,
    AlertCircle
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
        name: "1️⃣ Logistic Regression (Baseline)",
        type: "Logistic Regression (Binary Classifier)",
        imbalanceHandling: "❌ Not handled (baseline)",
        isBalanced: false,
        metrics: { accuracy: 88.5, precision: 62, recall: 3, f1: 0.05 },
        observation: "High accuracy but fails to detect defaulters. Not suitable for imbalanced data."
    },
    {
        id: "log_reg_bal",
        name: "2️⃣ Logistic Regression (Balanced)",
        type: "Logistic Regression with Class Weight Balancing",
        imbalanceHandling: "✅ class_weight = balanced",
        isBalanced: true,
        metrics: { accuracy: 68, precision: 22, recall: 69, f1: 0.33 },
        observation: "Improved recall significantly, but lower precision."
    },
    {
        id: "dt_tree",
        name: "3️⃣ Decision Tree Classifier",
        type: "Decision Tree (Depth-limited)",
        imbalanceHandling: "✅ Balanced class weights",
        isBalanced: true,
        metrics: { accuracy: 67, precision: 21, recall: 65, f1: 0.31 },
        observation: "Interpretable model but less stable and lower F1-score."
    },
    {
        id: "rf_init",
        name: "4️⃣ Random Forest (Initial)",
        type: "Random Forest Classifier",
        imbalanceHandling: "❌ Not optimized",
        isBalanced: false,
        metrics: { accuracy: 89, precision: 67, recall: 3, f1: 0.06 },
        observation: "High accuracy but poor default detection."
    },
    {
        id: "rf_bal_tuned",
        name: "5️⃣ Random Forest (Balanced & Tuned)",
        type: "Random Forest with Class Balancing",
        imbalanceHandling: "✅ Balanced",
        isBalanced: true,
        metrics: { accuracy: 70, precision: 23, recall: 66, f1: 0.34 },
        observation: "Strong improvement after balancing and tuning."
    },
    {
        id: "rf_final",
        name: "6️⃣ Optimized Random Forest (FINAL MODEL)",
        type: "Optimized Random Forest Classifier",
        imbalanceHandling: "✅ Balanced & Tuned",
        isBalanced: true,
        metrics: { accuracy: 73, precision: 24, recall: 62, f1: 0.35, meanCvF1: 0.34 },
        observation: "Best overall balance between recall, precision, and stability. Selected as final model.",
        isFinal: true,
        techniques: ["GridSearchCV", "Class Weight Balancing", "Feature Scaling", "Cross-Validation"]
    },
    {
        id: "gb_clf",
        name: "7️⃣ Gradient Boosting Classifier",
        type: "Gradient Boosting",
        imbalanceHandling: "❌ Limited",
        isBalanced: false,
        metrics: { accuracy: 89, precision: 66, recall: 5, f1: 0.10 },
        observation: "Very poor recall for defaulters. Not suitable."
    },
    {
        id: "ada_clf",
        name: "8️⃣ AdaBoost Classifier",
        type: "AdaBoost",
        imbalanceHandling: "❌ Limited",
        isBalanced: false,
        metrics: { accuracy: 89, precision: 62, recall: 5, f1: 0.09 },
        observation: "Performs similar to Gradient Boosting with poor default detection."
    }
];

export function ModelComparison() {
    const [expandedModel, setExpandedModel] = useState<string | null>("rf_final");

    return (
        <section className="w-full max-w-6xl px-0 py-0 mx-auto space-y-4">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Chart Section */}
                <Card className="lg:col-span-2 bg-card dark:bg-black/40 backdrop-blur-xl border-border dark:border-white/10 shadow-2xl">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <BarChart3 className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle>Performance Benchmarks</CardTitle>
                        </div>
                        <CardDescription>Comparing Accuracy vs. Recall (Defaulter Detection)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {models.map((model) => (
                            <div key={model.id} className={cn("space-y-2 p-3 rounded-xl transition-all border border-transparent", model.isFinal ? "bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" : "hover:bg-secondary dark:hover:bg-white/5 hover:border-border dark:hover:border-white/5")}>
                                <div className="flex justify-between items-center text-sm">
                                    <span className={cn("font-semibold flex items-center gap-2 font-mono", model.isFinal && "text-primary")}>
                                        {model.name}
                                        {model.isFinal && <Trophy className="h-4 w-4 text-yellow-500" />}
                                    </span>
                                </div>

                                {/* Accuracy Bar */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                        <span>Accuracy</span>
                                        <span>{model.metrics.accuracy}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary dark:bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500/80 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                            style={{ width: `${model.metrics.accuracy}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Recall/F1 Bar (More important) */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                        <span>Recall (Default Class)</span>
                                        <span>{model.metrics.recall}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary dark:bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]", model.isFinal ? "bg-primary" : "bg-green-500/80")}
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
                    <Card className="bg-card dark:bg-black/40 backdrop-blur-xl border-border dark:border-white/10 h-fit sticky top-24 shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-xl">Model Insights</CardTitle>
                            <CardDescription>Detailed analysis of each approach</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {models.map((model) => (
                                <div key={model.id} className="border rounded-lg border-border dark:border-white/5 overflow-hidden bg-secondary/10 dark:bg-black/20">
                                    <button
                                        onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}
                                        className="w-full flex items-center justify-between p-3 text-left hover:bg-secondary/50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <span className={cn("text-sm font-medium line-clamp-1 font-mono", model.isFinal && "text-primary")}>
                                            {model.name}
                                        </span>
                                        {expandedModel === model.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                                    </button>

                                    {expandedModel === model.id && (
                                        <div className="p-4 pt-0 space-y-3 text-sm bg-card dark:bg-black/40 border-t border-border dark:border-white/5 animate-in slide-in-from-top-2">
                                            <div className="space-y-1 pt-3">
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest font-mono">Type</span>
                                                <p className="text-foreground dark:text-gray-300">{model.type}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest font-mono">Imbalance Handling</span>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-foreground dark:text-gray-300">{model.imbalanceHandling}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest font-mono">Observation</span>
                                                <p className="text-muted-foreground italic border-l-2 border-primary/40 pl-2">{model.observation}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 pt-2">
                                                <div className="bg-secondary/20 dark:bg-white/5 p-2 rounded text-center border border-border dark:border-white/5 shadow-sm">
                                                    <span className="block text-[10px] text-muted-foreground font-mono uppercase">F1-Score</span>
                                                    <span className="font-bold text-primary">{model.metrics.f1}</span>
                                                </div>
                                                <div className="bg-secondary/20 dark:bg-white/5 p-2 rounded text-center border border-border dark:border-white/5 shadow-sm">
                                                    <span className="block text-[10px] text-muted-foreground font-mono uppercase">Precision</span>
                                                    <span className="font-bold text-primary">{model.metrics.precision}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Final Selection Summary */}
            <Card className="bg-primary/10 border-primary/20 backdrop-blur-xl shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-yellow-500 animate-pulse" />
                        <CardTitle>Final Model Selection Summary</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-lg font-medium leading-relaxed text-foreground dark:text-gray-200">
                        Although several models (Gradient Boosting, AdaBoost) achieved high accuracy (~89%), they failed to effectively detect defaulters (Recall ~5%).
                    </p>
                    <div className="flex items-start gap-3 p-4 bg-card dark:bg-black/40 rounded-xl border border-primary/20">
                        <div className="p-2 bg-green-500/10 rounded-full mt-1">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                            <p className="font-semibold text-lg mb-1 text-foreground dark:text-white">Why Optimized Random Forest?</p>
                            <p className="text-muted-foreground leading-relaxed">
                                The <span className="text-primary font-bold">Optimized Random Forest</span> was selected because it delivers the <span className="font-bold text-foreground dark:text-white">best overall balance</span>. It sacrifices some raw accuracy to achieve a much higher Recall (62%), ensuring we correctly identify a significant portion of potential defaulters while maintaining a stable F1-score across validation folds.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
