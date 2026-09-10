import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
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
import { generateTaskPlan } from "@/lib/generators";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI neXtstep" },
      {
        name: "description",
        content:
          "Turn a goal and a list of tasks into a phased plan with estimates, milestones and an order of work.",
      },
      { property: "og:title", content: "AI Task Planner — AI neXtstep" },
      {
        property: "og:description",
        content: "Break a goal into an ordered, realistic plan with milestones and risks.",
      },
    ],
  }),
  component: TaskPlanner,
});

const priorities = ["Low", "Medium", "High", "Urgent"];

function TaskPlanner() {
  const [goal, setGoal] = useState("");
  const [tasks, setTasks] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");

  return (
    <ToolPage
      icon={ListChecks}
      title="AI Task Planner"
      description="Describe your goal and everything it involves — get back a phased, ordered plan."
      generateLabel="Build my plan"
      outputTitle="Your task plan"
      validate={() => {
        if (goal.trim().length < 5) return "Please describe the goal you're working towards.";
        if (tasks.trim().length < 5) return "Please list at least one task or requirement.";
        return null;
      }}
      generate={() => generateTaskPlan({ goal, tasks, deadline, priority })}
      onClear={() => {
        setGoal("");
        setTasks("");
        setDeadline("");
        setPriority("Medium");
      }}
    >
      <Field label="Goal" htmlFor="goal">
        <Textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Submit a complete internship application pack"
          className="min-h-24"
        />
      </Field>

      <Field label="Tasks / requirements" hint="(one per line)" htmlFor="tasks">
        <Textarea
          id="tasks"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          placeholder={"Update CV\nWrite cover letter\nAsk lecturer for a reference\nCollect transcripts\nProofread everything"}
          className="min-h-40"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Deadline" hint="(optional)" htmlFor="deadline">
          <Input
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="e.g. 30 September"
          />
        </Field>

        <Field label="Priority">
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a priority" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
    </ToolPage>
  );
}
