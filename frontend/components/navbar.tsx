import Link from "next/link"
import { Button } from "@/components/ui/button"


export function Navbar() {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="flex items-center justify-between w-full max-w-6xl rounded-full border border-border/40 bg-background/80 backdrop-blur-xl px-6 py-4 shadow-2xl shadow-primary/5 support-[backdrop-filter]:bg-background/80">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-indigo-500 text-white font-bold text-lg shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                            CG
                            <div className="absolute inset-0 rounded-full bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="hidden sm:block text-base font-bold tracking-wide text-foreground/90 group-hover:text-primary transition-colors">
                            CREDITGUARD<span className="text-primary">.AI</span>
                        </span>
                    </Link>
                </div>

                {/* Centered Navigation (Desktop) */}
                <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full px-1 py-1 border border-border/40">
                    <NavLink href="/#features">Features</NavLink>
                    <NavLink href="/analytics">Model Specs</NavLink>
                    <NavLink href="/predict">Assess Risk</NavLink>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3">

                    <Link href="/predict">
                        <Button className="rounded-full px-6 h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 border-0 text-sm">
                            Launch App
                        </Button>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="px-5 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all"
        >
            {children}
        </Link>
    )
}
