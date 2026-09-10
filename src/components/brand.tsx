import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaypointMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm",
        className,
      )}
      aria-hidden="true"
    >
      <MapPin className="h-4 w-4" />
    </span>
  );
}

export function BrandName({ className }: { className?: string }) {
  return (
    <span className={cn("font-semibold tracking-tight text-foreground", className)}>
      AI ne
      <span className="relative inline-block text-accent-foreground">
        <span className="relative z-10 font-black text-primary">X</span>
        <span
          className="absolute -bottom-0.5 left-1/2 z-0 h-1 w-1 -translate-x-1/2 rounded-full bg-primary/70"
          aria-hidden="true"
        />
      </span>
      tstep
    </span>
  );
}

export function BrandLockup({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <WaypointMark />
      <span className="flex flex-col leading-tight">
        <BrandName className="text-base" />
        <span className="text-[11px] text-muted-foreground">Find your neXt step</span>
      </span>
    </div>
  );
}

export const TAGLINE = "Helping you find your neXt step.";
export const AI_DISCLAIMER =
  "AI-generated content may contain errors. Please review before use.";
