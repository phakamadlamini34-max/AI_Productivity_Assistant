import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navItems } from "@/components/nav-items";
import { BrandLockup, TAGLINE } from "@/components/brand";
import { cn } from "@/lib/utils";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm transition-colors",
              active
                ? "border-border bg-card font-medium text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon
              className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")}
            />
            <span className="min-w-0 truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-border bg-sidebar px-4 py-5 lg:flex">
        <Link to="/" className="px-1">
          <BrandLockup />
        </Link>
        <div className="mt-7 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace
        </div>
        <div className="mt-2">
          <NavList />
        </div>
        <p className="mt-auto rounded-lg border border-border bg-card p-3 text-xs leading-relaxed text-muted-foreground">
          {TAGLINE}
        </p>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-4">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <BrandLockup />
                <div className="mt-6">
                  <NavList onNavigate={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="min-w-0 lg:hidden">
              <BrandLockup />
            </div>
            <p className="hidden min-w-0 truncate text-sm text-muted-foreground lg:block">
              {TAGLINE}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground">
            MVP preview
          </span>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
