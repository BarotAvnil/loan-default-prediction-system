import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary/20">
      <Navbar />

      {/* Dynamic Background Gradient (Same as Predict Page) */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:14px_24px] opacity-20">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      <main className="flex-1 pt-32 pb-12">
        <section className="container mx-auto px-4 text-center">
          {/* Main Header */}
          <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-2 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              ENTERPRISE V1.2 :: ONLINE
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Algorithmic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/80 to-foreground/40">
                Risk Intelligence
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Deploy institutional-grade machine learning models to predict credit defaults with
              <span className="text-foreground font-medium"> 99.9% uptime</span> and
              <span className="text-foreground font-medium"> millisecond latency</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/predict">
                <Button size="lg" className="rounded-full px-8 h-12 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all hover:scale-105 border-0">
                  Launch Terminal
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-sm font-medium border-border/40 bg-card/50 hover:bg-card/80 text-foreground backdrop-blur-sm transition-all hover:scale-105">
                  View Benchmarks
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard Preview / Bento Grid */}
          <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-forwards">

            {/* Card 1: Accuracy */}
            <div className="md:col-span-1 p-6 rounded-3xl border border-border/60 bg-card shadow-lg shadow-primary/5 hover:shadow-primary/10 hover:border-primary/20 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-8">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">ACC_METRIC</span>
              </div>
              <div className="text-left">
                <div className="text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">82.4%</div>
                <p className="text-sm text-muted-foreground">Precision detection rate on validation set.</p>
              </div>
            </div>

            {/* Card 2: Main Visualization (Hero Image replacer) */}
            <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-lg shadow-primary/5 group min-h-[250px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* Abstract Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] opacity-30"></div>

              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/50 backdrop-blur-md border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.2)] mb-4">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-primary tracking-[0.2em]">SYSTEM ONLINE</span>
                </div>

                <div className="flex items-center gap-1.5 justify-center h-16">
                  <div className="w-1.5 bg-gradient-to-t from-primary/20 to-primary rounded-full animate-[music-bar_1s_ease-in-out_infinite]" style={{ height: '40%' }} />
                  <div className="w-1.5 bg-gradient-to-t from-primary/20 to-primary rounded-full animate-[music-bar_1.2s_ease-in-out_infinite]" style={{ height: '80%' }} />
                  <div className="w-1.5 bg-gradient-to-t from-primary/20 to-primary rounded-full animate-[music-bar_0.8s_ease-in-out_infinite]" style={{ height: '50%' }} />
                  <div className="w-1.5 bg-gradient-to-t from-primary/20 to-primary rounded-full animate-[music-bar_1.5s_ease-in-out_infinite]" style={{ height: '100%' }} />
                  <div className="w-1.5 bg-gradient-to-t from-primary/20 to-primary rounded-full animate-[music-bar_1.1s_ease-in-out_infinite]" style={{ height: '60%' }} />
                  <div className="w-1.5 bg-gradient-to-t from-primary/20 to-primary rounded-full animate-[music-bar_0.9s_ease-in-out_infinite]" style={{ height: '90%' }} />
                  <div className="w-1.5 bg-gradient-to-t from-primary/20 to-primary rounded-full animate-[music-bar_1.3s_ease-in-out_infinite]" style={{ height: '45%' }} />
                </div>
              </div>
            </div>

            {/* Card 3: Speed */}
            <div className="md:col-span-1 p-6 rounded-3xl border border-border/60 bg-card shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 hover:border-indigo-500/20 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-8">
                <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-500">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">LATENCY</span>
              </div>
              <div className="text-left">
                <div className="text-4xl font-bold text-foreground mb-2 group-hover:text-indigo-500 transition-colors">&lt;50ms</div>
                <p className="text-sm text-muted-foreground">Real-time inference via edge computing.</p>
              </div>
            </div>

            {/* Card 4: Global Scale */}
            <div className="md:col-span-2 p-6 rounded-3xl border border-border/60 bg-card shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 hover:border-purple-500/20 transition-all duration-300 group flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground mb-1">Global Infrastructure</h3>
                <p className="text-sm text-muted-foreground">Deployable across all major financial regions.</p>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`h-10 w-10 rounded-full border-2 border-background bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-muted-foreground`}>
                    {i}
                  </div>
                ))}
                <div className="h-10 w-10 rounded-full border-2 border-background bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-foreground">
                  +
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto w-full px-4 scroll-mt-20">
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-yellow-500" />}
            title="Instant Analysis"
            description="Get real-time predictions based on key financial metrics."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-green-500" />}
            title="Secure & Private"
            description="Your data is processed securely and never stored."
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6 text-blue-500" />}
            title="High Accuracy"
            description="Powered by state-of-the-art ML algorithms trained on vast datasets."
          />
        </div>

      </main>

      <footer className="py-8 text-center text-xs font-mono text-muted-foreground border-t border-white/5 bg-black">
        <p>© {new Date().getFullYear()} CREDITGUARD.AI // SYSTEM_V1.2 // SECURE_CONNECTION</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center p-8 bg-card/40 backdrop-blur-md rounded-lg border border-border/40 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 group shadow-sm dark:shadow-none">
      <div className="p-3 bg-secondary rounded-full mb-6 ring-1 ring-border group-hover:ring-primary/50 group-hover:text-primary transition-all">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-3 text-foreground font-mono tracking-wide">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed text-center font-mono">{description}</p>
    </div>
  )
}
