"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { predictLoanDefault } from "@/lib/api";
import { Loader2, AlertCircle, CheckCircle2, Terminal, ChevronRight, Activity, Cpu, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PredictPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        // Numeric
        name: "", // Optional Name field
        age: "",
        income: "",
        loan_amount: "",
        credit_score: "",
        months_employed: "",
        num_credit_lines: "",
        interest_rate: "",
        loan_term: "",
        dti_ratio: "",
        // Categorical
        education: "",
        employment_type: "",
        marital_status: "",
        has_mortgage: "",
        has_dependents: "",
        loan_purpose: "",
        has_cosigner: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        // Mappings for Categorical Data
        const educationMap: Record<string, number> = { "High School": 0, "Bachelor's": 1, "Master's": 2, "PhD": 3 };
        const employmentMap: Record<string, number> = { "Unemployed": 0, "Part-time": 1, "Full-time": 2, "Self-employed": 3 };
        const maritalMap: Record<string, number> = { "Single": 0, "Married": 1, "Divorced": 2, "Widowed": 3 };
        const loanPurposeMap: Record<string, number> = { "Business": 0, "Home": 1, "Education": 2, "Personal": 3, "Auto": 4, "Other": 5 };
        const binaryMap: Record<string, number> = { "No": 0, "Yes": 1 };

        const features = [
            Number(formData.age),
            Number(formData.income),
            Number(formData.loan_amount),
            Number(formData.credit_score),
            Number(formData.months_employed),
            Number(formData.num_credit_lines),
            Number(formData.interest_rate),
            Number(formData.loan_term),
            Number(formData.dti_ratio),
            educationMap[formData.education] ?? 0,
            employmentMap[formData.employment_type] ?? 0,
            maritalMap[formData.marital_status] ?? 0,
            binaryMap[formData.has_mortgage] ?? 0,
            binaryMap[formData.has_dependents] ?? 0,
            loanPurposeMap[formData.loan_purpose] ?? 0,
            binaryMap[formData.has_cosigner] ?? 0
        ];

        const payload = { features: features };

        try {
            const data = await predictLoanDefault(payload);
            setResult(data);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = () => {
        if (!result) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 14;

        // --- Colors ---
        const primaryColor = "#4F46E5"; // Indigo 600
        const successColor = "#059669"; // Emerald 600
        const dangerColor = "#DC2626"; // Red 600
        const darkText = "#1F2937"; // Gray 800
        const lightText = "#6B7280"; // Gray 500

        // --- Header ---
        doc.setFillColor(primaryColor);
        doc.rect(0, 0, pageWidth, 5, "F"); // Top colored bar

        doc.setFontSize(22);
        doc.setTextColor(primaryColor);
        doc.setFont("helvetica", "bold");
        doc.text("CREDITGUARD.AI", margin, 20);

        doc.setFontSize(10);
        doc.setTextColor(lightText);
        doc.setFont("helvetica", "normal");
        doc.text("INTELLIGENT RISK ASSESSMENT SYSTEM", margin, 26);

        // Metadata (Right aligned)
        const dateStr = new Date().toLocaleDateString();
        const refId = Math.random().toString(36).substr(2, 9).toUpperCase();

        doc.setFontSize(9);
        doc.text(`DATE: ${dateStr}`, pageWidth - margin, 20, { align: "right" });
        doc.text(`REF ID: #REF-${refId}`, pageWidth - margin, 25, { align: "right" });

        // Prepared For
        if (formData.name) {
            doc.setFontSize(11);
            doc.setTextColor(darkText);
            doc.text(`PREPARED FOR: ${formData.name.toUpperCase()}`, margin, 38);
        }

        // --- Executive Summary ---
        const summaryY = formData.name ? 45 : 35;
        const isHighRisk = result.prediction === 1;
        const summaryColor = isHighRisk ? dangerColor : successColor;
        const summaryBg = isHighRisk ? "#FEF2F2" : "#ECFDF5"; // Very light red/green

        // Background Box
        doc.setDrawColor(summaryColor);
        doc.setFillColor(summaryBg);
        doc.roundedRect(margin, summaryY, pageWidth - (margin * 2), 35, 2, 2, "FD");

        // Status Text
        doc.setFontSize(16);
        doc.setTextColor(summaryColor);
        doc.setFont("helvetica", "bold");
        doc.text(isHighRisk ? "RISK ASSESSMENT: HIGH RISK" : "RISK ASSESSMENT: LOW RISK", margin + 6, summaryY + 12);

        // Probability
        doc.setFontSize(10);
        doc.setTextColor(darkText);
        doc.setFont("helvetica", "bold");
        doc.text(`DEFAULT PROBABILITY: ${(result.default_probability * 100).toFixed(2)}%`, margin + 6, summaryY + 22);

        // Advisory
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(lightText);
        const advisory = isHighRisk
            ? "NOTICE: This entity has been flagged for potential default. Enhanced due diligence is recommended before proceeding."
            : "NOTICE: This entity falls within acceptable risk thresholds. Standard approval protocols apply.";
        doc.text(advisory, margin + 6, summaryY + 30);


        // --- Key Risk Drivers (Highlights) ---
        const driversY = summaryY + 45;
        doc.setFontSize(12);
        doc.setTextColor(darkText);
        doc.setFont("helvetica", "bold");
        doc.text("KEY RISK FACTORS", margin, driversY);

        // Draw 4 Highlight Boxes
        const boxWidth = (pageWidth - (margin * 2) - 15) / 4; // 3 gaps of 5
        const boxHeight = 25;
        const driverStartY = driversY + 5;

        const drivers = [
            { label: "CREDIT SCORE", value: formData.credit_score, color: "#4F46E5" },
            { label: "DTI RATIO", value: formData.dti_ratio, color: "#4F46E5" },
            { label: "ANNUAL INCOME", value: `$${Number(formData.income).toLocaleString()}`, color: "#4F46E5" },
            { label: "LOAN AMOUNT", value: `$${Number(formData.loan_amount).toLocaleString()}`, color: "#4F46E5" },
        ];

        drivers.forEach((driver, index) => {
            const x = margin + (index * (boxWidth + 5));

            // Box Border
            doc.setDrawColor("#E5E7EB"); // Light gray
            doc.setFillColor("#F9FAFB"); // Very light gray
            doc.roundedRect(x, driverStartY, boxWidth, boxHeight, 1, 1, "FD");

            // Label
            doc.setFontSize(7);
            doc.setTextColor(lightText);
            doc.setFont("helvetica", "bold");
            doc.text(driver.label, x + (boxWidth / 2), driverStartY + 8, { align: "center" });

            // Value
            doc.setFontSize(11);
            doc.setTextColor(driver.color);
            doc.text(String(driver.value), x + (boxWidth / 2), driverStartY + 18, { align: "center" });
        });

        // --- Comprehensive Data Table ---
        const tableStartY = driverStartY + boxHeight + 10;

        const tableData = [
            [{ content: "FINANCIAL VECTORS", colSpan: 2, styles: { fillColor: [243, 244, 246] as [number, number, number], fontStyle: 'bold' as 'bold', textColor: [31, 41, 55] as [number, number, number] } }],
            ["Annual Income", `$${Number(formData.income).toLocaleString()}`],
            ["Loan Amount", `$${Number(formData.loan_amount).toLocaleString()}`],
            ["Credit Score", formData.credit_score],
            ["Months Employed", formData.months_employed],
            ["Num Credit Lines", formData.num_credit_lines],
            ["Interest Rate", `${formData.interest_rate}%`],
            ["Loan Term", `${formData.loan_term} months`],
            ["DTI Ratio", formData.dti_ratio],

            [{ content: "PERSONAL IDENTIFIERS", colSpan: 2, styles: { fillColor: [243, 244, 246] as [number, number, number], fontStyle: 'bold' as 'bold', textColor: [31, 41, 55] as [number, number, number] } }],
            ["Age", formData.age],
            ["Education", formData.education],
            ["Employment Type", formData.employment_type],
            ["Marital Status", formData.marital_status],
            ["Has Mortgage", formData.has_mortgage === "1" ? "Yes" : "No"],
            ["Has Dependents", formData.has_dependents === "1" ? "Yes" : "No"],
            ["Loan Purpose", formData.loan_purpose],
            ["Has Cosigner", formData.has_cosigner === "1" ? "Yes" : "No"],
        ];

        autoTable(doc, {
            body: tableData,
            startY: tableStartY,
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: [229, 231, 235] as [number, number, number],
                lineWidth: 0.1,
            },
            headStyles: {
                fillColor: [79, 70, 229] as [number, number, number],
                textColor: [255, 255, 255] as [number, number, number],
                fontStyle: 'bold' as 'bold'
            },
            columnStyles: {
                0: { cellWidth: 80, fontStyle: 'bold' as 'bold', textColor: [75, 85, 99] as [number, number, number] },
                1: { textColor: [17, 24, 39] as [number, number, number] }
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255] as [number, number, number]
            }
        });

        // --- Footer ---
        const footerY = pageHeight - 10;
        doc.setFontSize(8);
        doc.setTextColor(lightText);
        doc.text("CONFIDENTIAL: This report is generated by CreditGuard.AI for internal review only.", margin, footerY);
        doc.text("Page 1 of 1", pageWidth - margin, footerY, { align: "right" });

        doc.save("CreditGuard_Professional_Report.pdf");
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 flex flex-col">
            <Navbar />

            {/* Matrix/Grid Background */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

            <main className="flex-1 pt-36 pb-12 px-4 container mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
                    <Terminal className="h-6 w-6 text-primary animate-pulse" />
                    <h1 className="text-xl font-mono tracking-wider text-muted-foreground">
                        <span className="text-foreground font-bold">RISK_ASSESSMENT_TERMINAL</span> // V1.2
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

                    {/* Left Column: Data Entry Terminal */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="rounded-lg border border-border/40 bg-card/40 backdrop-blur-md overflow-hidden flex flex-col h-full shadow-sm dark:shadow-none">
                            <div className="bg-secondary/50 px-4 py-2 border-b border-border/40 flex items-center justify-between">
                                <span className="text-xs font-mono text-muted-foreground">INPUT_STREAM</span>
                                <div className="flex gap-1.5">
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
                                </div>
                            </div>

                            <div className="p-6 overflow-y-auto max-h-[800px] scrollbar-hide">
                                <form onSubmit={handleSubmit} className="space-y-8 font-mono">
                                    {/* Section 1: Financial Vectors */}
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Activity className="h-3 w-3" /> Financial_Vectors
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                            <TerminalInput label="Annual Income" id="income" placeholder="850000" help="Total gross annual income before taxes." onChange={handleChange} />
                                            <TerminalInput label="Loan Amount" id="loan_amount" placeholder="150000" help="The total principal amount requested for the loan." onChange={handleChange} />
                                            <TerminalInput label="Credit Score" id="credit_score" placeholder="720" help="FICO score (range: 300-850)." onChange={handleChange} />
                                            <TerminalInput label="Interest Rate (%)" id="interest_rate" placeholder="5.5" step="0.1" help="Proposed annual interest rate." onChange={handleChange} />
                                            <TerminalInput label="Term (Mos)" id="loan_term" placeholder="36" help="Duration of the loan in months." onChange={handleChange} />
                                            <TerminalInput label="DTI Ratio" id="dti_ratio" placeholder="0.35" step="0.01" help="Debt-to-Income Ratio (Total Monthly Debt / Gross Monthly Income)." onChange={handleChange} />
                                        </div>
                                    </div>

                                    {/* Section 2: Personal Identifiers */}
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2 pt-4 border-t border-border/40">
                                            <Cpu className="h-3 w-3" /> Personal_Identifiers
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                            <div className="sm:col-span-2">
                                                <TerminalInput label="Applicant Name (Optional)" id="name" placeholder="John Doe" type="text" help="Name to appear on the generated report." required={false} onChange={handleChange} />
                                            </div>
                                            <TerminalInput label="Age" id="age" placeholder="32" help="Applicant's age in years." onChange={handleChange} />
                                            <TerminalInput label="Employ. Mos" id="months_employed" placeholder="48" help="Total months of continuous employment." onChange={handleChange} />
                                            <TerminalInput label="Cred Lines" id="num_credit_lines" placeholder="2" help="Number of active or past credit lines." onChange={handleChange} />

                                            <TerminalSelect label="Education" id="education" help="Highest level of education completed." onChange={handleSelectChange}
                                                options={["High School", "Bachelor's", "Master's", "PhD"]} />
                                            <TerminalSelect label="Employment" id="employment_type" help="Current employment status." onChange={handleSelectChange}
                                                options={["Full-time", "Part-time", "Self-employed", "Unemployed"]} />
                                            <TerminalSelect label="Marital" id="marital_status" help="Current marital status." onChange={handleSelectChange}
                                                options={["Single", "Married", "Divorced", "Widowed"]} />
                                            <TerminalSelect label="Purpose" id="loan_purpose" help="Primary reason for requesting the loan." onChange={handleSelectChange}
                                                options={["Business", "Home", "Education", "Personal", "Auto", "Other"]} />
                                            <TerminalSelect label="Mortgage?" id="has_mortgage" help="Do you currently have an active mortgage?" onChange={handleSelectChange} options={["No", "Yes"]} />
                                            <TerminalSelect label="Dependents?" id="has_dependents" help="Do you have any financial dependents?" onChange={handleSelectChange} options={["No", "Yes"]} />
                                            <TerminalSelect label="Co-Signer?" id="has_cosigner" help="Is there a co-signer for this loan?" onChange={handleSelectChange} options={["No", "Yes"]} />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-12 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-mono uppercase tracking-widest text-sm transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                        >
                                            {loading ? <span className="animate-pulse">&gt;&gt; EXECUTING_MODEL...</span> : ">> RUN_RISK_ANALYSIS"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Output Console */}
                    <div className="lg:col-span-5 h-full min-h-[500px]">
                        <div className="sticky top-28 h-auto">
                            <AnimatePresence mode="wait">
                                {!result && !error && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full w-full rounded-lg border border-dashed border-border/40 bg-card/20 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center space-y-6 font-mono"
                                    >
                                        <div className="relative h-32 w-32 flex items-center justify-center">
                                            {/* Radar Rings */}
                                            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[ping_3s_linear_infinite]" />
                                            <div className="absolute inset-0 rounded-full border border-primary/10 animate-[ping_3s_linear_infinite_1.5s]" />
                                            <div className="absolute inset-4 rounded-full border border-primary/30" />

                                            {/* Rotating Scan Line */}
                                            <div className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]">
                                                <div className="h-[50%] w-[1px] bg-gradient-to-t from-transparent via-primary/50 to-primary absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                            </div>

                                            {/* Center Dot */}
                                            <div className="h-3 w-3 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,1)] animate-pulse relative z-10" />
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-primary font-bold text-sm tracking-widest uppercase">System Standby</p>
                                            <p className="text-muted-foreground text-xs animated-pulse">Listening for data stream...</p>

                                            <div className="flex gap-1 justify-center pt-2 opacity-50">
                                                <span className="h-1 w-1 bg-primary rounded-full animate-bounce delay-75" />
                                                <span className="h-1 w-1 bg-primary rounded-full animate-bounce delay-150" />
                                                <span className="h-1 w-1 bg-primary rounded-full animate-bounce delay-300" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="rounded-lg border border-border bg-card/60 backdrop-blur-xl overflow-hidden shadow-2xl"
                                    >
                                        <div className="bg-primary/10 px-4 py-2 border-b border-primary/20 flex justify-between items-center">
                                            <span className="text-xs font-mono text-primary font-bold">ANALYSIS_COMPLETE</span>
                                            <span className="text-[10px] font-mono text-primary/70">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                        </div>

                                        <div className="p-8 flex flex-col items-center text-center space-y-6">

                                            {/* "Holographic" Result Ring */}
                                            <div className="relative h-40 w-40 flex items-center justify-center">
                                                <div className={`absolute inset-0 rounded-full border-4 opacity-20 ${result.prediction === 1 ? 'border-red-500' : 'border-green-500'} animate-ping`} />
                                                <div className={`absolute inset-0 rounded-full border-2 ${result.prediction === 1 ? 'border-red-500' : 'border-green-500'}`} />
                                                <div className="relative z-10 flex flex-col items-center">
                                                    {result.prediction === 1 ? (
                                                        <>
                                                            <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                                                            <span className="text-2xl font-bold text-red-500 font-mono tracking-tighter">HIGH_RISK</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                                                            <span className="text-2xl font-bold text-green-500 font-mono tracking-tighter">LOW_RISK</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Metrics Grid */}
                                            <div className="grid grid-cols-2 w-full gap-2 font-mono text-xs">
                                                <div className="bg-secondary/20 p-3 rounded border border-border/50">
                                                    <div className="text-muted-foreground mb-1">CREDIT_SCORE</div>
                                                    <div className="text-foreground font-bold text-lg">{formData.credit_score}</div>
                                                </div>
                                                <div className="bg-secondary/20 p-3 rounded border border-border/50">
                                                    <div className="text-muted-foreground mb-1">DTI_RATIO</div>
                                                    <div className="text-foreground font-bold text-lg">{formData.dti_ratio}</div>
                                                </div>
                                            </div>

                                            <div className="w-full text-left font-mono text-xs text-muted-foreground leading-relaxed p-4 bg-muted/20 border-l-2 border-primary/50">
                                                <span className="text-primary font-bold">{">>"} SYSTEM_ADVISORY:</span>
                                                <br />
                                                {result.prediction === 1
                                                    ? "Entity flagged for high probability of default. Recommend enhanced due diligence and collateral verification."
                                                    : "Entity clears standard risk thresholds. Auto-approval protocols engaged."}
                                            </div>

                                            <Button variant="outline" className="w-full font-mono text-xs border-border hover:bg-secondary text-foreground transition-colors" onClick={handleExportPDF}>
                                                EXPORT_REPORT.PDF
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}



function TerminalInput({ label, id, placeholder, type = "number", step, onChange, help, ...rest }: any) {
    return (
        <div className="flex flex-col gap-2 focus-within:text-primary transition-colors group relative">
            <div className="flex items-center gap-2">
                <Label htmlFor={id} className="text-xs uppercase tracking-widest text-muted-foreground font-semibold group-focus-within:text-primary transition-colors">{label}</Label>
                {help && (
                    <div className="group/tooltip relative">
                        <Info className="h-3 w-3 text-muted-foreground/50 hover:text-primary cursor-help transition-colors" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover/95 backdrop-blur-md border border-border rounded-md shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                            <p className="text-[10px] text-popover-foreground font-sans leading-relaxed">{help}</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-popover/95" />
                        </div>
                    </div>
                )}
            </div>
            <Input
                id={id}
                name={id}
                type={type}
                step={step}
                placeholder={placeholder}
                required={rest.required ?? true}
                onChange={onChange}
                className="h-11 bg-background/50 backdrop-blur-sm border-border text-foreground font-mono text-base focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-md transition-all"
            />
        </div>
    )
}

function TerminalSelect({ label, id, options, onChange, help }: any) {
    return (
        <div className="flex flex-col gap-2 focus-within:text-primary transition-colors group relative">
            <div className="flex items-center gap-2">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold group-focus-within:text-primary transition-colors">{label}</Label>
                {help && (
                    <div className="group/tooltip relative">
                        <Info className="h-3 w-3 text-muted-foreground/50 hover:text-primary cursor-help transition-colors" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover/95 backdrop-blur-md border border-border rounded-md shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                            <p className="text-[10px] text-popover-foreground font-sans leading-relaxed">{help}</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-popover/95" />
                        </div>
                    </div>
                )}
            </div>
            <Select required onValueChange={(value) => onChange(id, value)}>
                <SelectTrigger className="h-11 bg-background/50 backdrop-blur-sm border-border text-foreground font-mono text-base focus:border-primary focus:ring-1 focus:ring-primary rounded-md transition-all">
                    <SelectValue placeholder="SELECT..." />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border text-popover-foreground font-mono">
                    {options.map((opt: string) => (
                        <SelectItem key={opt} value={opt} className="focus:bg-primary/10 focus:text-primary cursor-pointer text-base">{opt}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
