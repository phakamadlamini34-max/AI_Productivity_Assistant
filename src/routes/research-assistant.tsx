import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, ToolPage } from "@/components/tool-page";
import { generateResearch } from "@/lib/generators";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI neXtstep" },
      {
        name: "description",
        content:
          "Turn a research topic into a summary, key concepts, research questions, a review outline or a full plan.",
      },
      { property: "og:title", content: "AI Research Assistant — AI neXtstep" },
      {
        property: "og:description",
        content: "Structure any research topic into concepts, questions, outlines or a plan.",
      },
    ],
  }),
  component: ResearchAssistant,
});

const outputTypes = [
  "Research Summary",
  "Key Concepts",
  "Research Questions",
  "Literature Review Outline",
  "Research Plan",
];

function ResearchAssistant() {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [outputType, setOutputType] = useState("Research Summary");

  return (
    <ToolPage
      icon={BookOpenCheck}
      title="AI Research Assistant"
      description="Give a topic and pick what you need — a summary, concepts, questions, an outline or a plan."
      generateLabel="Synthesize"
      outputTitle={outputType}
      validate={() =>
        topic.trim().length < 5 ? "Please enter a research topic to work with." : null
      }
      generate={() => generateResearch({ topic, context, outputType })}
      onClear={() => {
        setTopic("");
        setContext("");
        setOutputType("Research Summary");
      }}
    >
      <Field label="Research topic" htmlFor="topic">
        <Textarea
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. The impact of remote work on graduate employability"
          className="min-h-24"
        />
      </Field>

      <Field label="Context" hint="(optional)" htmlFor="context">
        <Textarea
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. Final-year business degree assignment, 2 500 words, South African focus."
          className="min-h-24"
        />
      </Field>

      <Field label="Output type">
        <Select value={outputType} onValueChange={setOutputType}>
          <SelectTrigger className="w-full sm:w-72">
            <SelectValue placeholder="Choose an output type" />
          </SelectTrigger>
          <SelectContent>
            {outputTypes.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </ToolPage>
  );
}
