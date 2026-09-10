import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Route as RouteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toolItems } from "@/components/nav-items";
import { BrandName, TAGLINE, WaypointMark } from "@/components/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI neXtstep — Workplace productivity assistant" },
      {
        name: "description",
        content:
          "AI neXtstep helps students and graduates draft emails, summarise meetings, plan tasks and research faster. Helping you find your neXt step.",
      },
      { property: "og:title", content: "AI neXtstep — Workplace productivity assistant" },
      {
        property: "og:description",
        content:
          "Five AI assistants for emails, meeting notes, task planning, research and career questions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-9">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--color-primary) 0 1px, transparent 1px 14px)",
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <RouteIcon className="h-3.5 w-3.5 text-primary" />
            Your workplace productivity companion
          </span>
          <div className="mt-5 flex items-center gap-3">
            <WaypointMark className="h-11 w-11 rounded-xl" />
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
              <BrandName className="text-2xl sm:text-4xl" />
            </h1>
          </div>
          <p className="mt-3 text-base font-medium text-primary sm:text-lg">{TAGLINE}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Built for students and graduates stepping into the workplace. Draft confident emails,
            turn messy meeting notes into clear actions, plan your week, research faster, and ask
            anything about work and career preparation — all in one place, no setup required.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Your assistants
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {toolItems.map((tool) => (
            <Card
              key={tool.to}
              className="flex flex-col border-border shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-primary">
                  <tool.icon className="h-5 w-5" />
                </span>
                <CardTitle className="min-w-0 text-base leading-snug">{tool.label}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                <Button asChild variant="outline" className="w-fit">
                  <Link to={tool.to}>
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
