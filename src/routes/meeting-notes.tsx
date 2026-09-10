import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, ToolPage } from "@/components/tool-page";
import { generateMeetingSummary } from "@/lib/generators";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI neXtstep" },
      {
        name: "description",
        content:
          "Paste raw meeting notes and get an overview, key points, decisions, action items and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — AI neXtstep" },
      {
        property: "og:description",
        content: "Turn messy notes into a structured summary with decisions and action items.",
      },
    ],
  }),
  component: MeetingNotes,
});

function MeetingNotes() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <ToolPage
      icon={NotebookPen}
      title="Meeting Notes Summarizer"
      description="Paste your rough notes and get a structured summary you can share with the team."
      generateLabel="Summarize notes"
      outputTitle="Structured summary"
      validate={() =>
        notes.trim().length < 20
          ? "Please paste at least a few lines of meeting notes to summarise."
          : null
      }
      generate={() => generateMeetingSummary({ title, notes })}
      onClear={() => {
        setTitle("");
        setNotes("");
      }}
    >
      <Field label="Meeting title" hint="(optional)" htmlFor="title">
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Weekly project stand-up"
        />
      </Field>

      <Field label="Raw notes" htmlFor="notes">
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={
            "Thabo will send the budget draft by Friday\nAgreed to move launch to 14 March\nDesign feedback still outstanding\nSipho to book the venue next week"
          }
          className="min-h-56"
        />
      </Field>
    </ToolPage>
  );
}
