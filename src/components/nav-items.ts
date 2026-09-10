import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  BookOpenCheck,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

export const navItems: NavItem[] = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Your starting point and overview of every assistant.",
  },
  {
    to: "/email-generator",
    label: "Smart Email Generator",
    icon: Mail,
    description: "Draft clear, well-toned workplace emails in seconds.",
  },
  {
    to: "/meeting-notes",
    label: "Meeting Notes Summarizer",
    icon: NotebookPen,
    description: "Turn messy notes into decisions, actions and deadlines.",
  },
  {
    to: "/task-planner",
    label: "AI Task Planner",
    icon: ListChecks,
    description: "Break a goal into an ordered, realistic task plan.",
  },
  {
    to: "/research-assistant",
    label: "AI Research Assistant",
    icon: BookOpenCheck,
    description: "Summarise topics, concepts and research directions.",
  },
  {
    to: "/chatbot",
    label: "AI Chatbot",
    icon: MessagesSquare,
    description: "Ask anything about work, study and career preparation.",
  },
];

export const toolItems = navItems.filter((item) => item.to !== "/");
