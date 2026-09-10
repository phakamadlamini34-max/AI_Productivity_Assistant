import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, ToolPage } from "@/components/tool-page";
import { generateEmail } from "@/lib/generators";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI neXtstep" },
      {
        name: "description",
        content:
          "Draft professional workplace emails in seconds. Choose a tone, add key points and get an editable draft.",
      },
      { property: "og:title", content: "Smart Email Generator — AI neXtstep" },
      {
        property: "og:description",
        content: "Turn a purpose and a few key points into a polished, editable email draft.",
      },
    ],
  }),
  component: EmailGenerator,
});

const tones = ["Professional", "Formal", "Friendly", "Concise"];

function EmailGenerator() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keyPoints, setKeyPoints] = useState("");

  return (
    <ToolPage
      icon={Mail}
      title="Smart Email Generator"
      description="Describe what you need to say and get a clear, well-toned email draft you can edit."
      generateLabel="Generate email"
      outputTitle="Email draft"
      validate={() =>
        purpose.trim().length < 10
          ? "Please describe the purpose of your email in at least a sentence."
          : null
      }
      generate={() => generateEmail({ purpose, recipient, tone, keyPoints })}
      onClear={() => {
        setPurpose("");
        setRecipient("");
        setTone("Professional");
        setKeyPoints("");
      }}
    >
      <Field label="Purpose / context" htmlFor="purpose">
        <Textarea
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="e.g. Request a two-day extension on the marketing report because the data arrived late."
          className="min-h-28"
        />
      </Field>

      <Field label="Recipient" hint="(name or role)" htmlFor="recipient">
        <Input
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="e.g. Ms Naidoo"
        />
      </Field>

      <Field label="Tone">
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Choose a tone" />
          </SelectTrigger>
          <SelectContent>
            {tones.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Key points" hint="(one per line, optional)" htmlFor="keypoints">
        <Textarea
          id="keypoints"
          value={keyPoints}
          onChange={(e) => setKeyPoints(e.target.value)}
          placeholder={"Draft is 80% complete\nNew data expected Thursday\nHappy to share a partial version"}
          className="min-h-28"
        />
      </Field>
    </ToolPage>
  );
}
