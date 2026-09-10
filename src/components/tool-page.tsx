import { useState, type ReactNode } from "react";
import { Copy, Check, RefreshCw, Trash2, Sparkle, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AI_DISCLAIMER } from "@/components/brand";
import { delay } from "@/lib/generators";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

export function ToolHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

type ToolPageProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Form fields rendered inside the input card. */
  children: ReactNode;
  /** Return an error string to block generation, or null when valid. */
  validate: () => string | null;
  /** Produce the output text. */
  generate: () => string;
  onClear: () => void;
  generateLabel?: string;
  outputTitle?: string;
};

export function ToolPage({
  icon,
  title,
  description,
  children,
  validate,
  generate,
  onClear,
  generateLabel = "Generate",
  outputTitle = "Generated output",
}: ToolPageProps) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setLoading(true);
    await delay(900 + Math.random() * 700);
    setOutput(generate());
    setLoading(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy — please select and copy manually.");
    }
  };

  const clearAll = () => {
    onClear();
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <ToolHeader icon={icon} title={title} description={description} />

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Your input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {children}

          {error ? (
            <p className="rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Button onClick={run} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkle className="h-4 w-4" />
                  {generateLabel}
                </>
              )}
            </Button>
            <Button variant="outline" onClick={clearAll} disabled={loading}>
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <Card className="border-border shadow-sm">
          <CardContent className="space-y-3 py-6">
            <div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-11/12 animate-pulse rounded bg-muted" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
          </CardContent>
        </Card>
      ) : null}

      {!loading && output ? (
        <Card className="border-border shadow-sm">
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <CardTitle className="min-w-0 truncate text-base">{outputTitle}</CardTitle>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={copy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={run}>
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="min-h-[340px] resize-y whitespace-pre-wrap font-mono text-[13px] leading-relaxed"
              aria-label={outputTitle}
            />
            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-px h-3.5 w-3.5 shrink-0" />
              {AI_DISCLAIMER}
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {label}
        {hint ? <span className="ml-2 font-normal text-muted-foreground">{hint}</span> : null}
      </label>
      {children}
    </div>
  );
}
