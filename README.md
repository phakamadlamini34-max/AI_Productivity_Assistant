# AI Nextstep Assistant

Build the AI neXtstep MVP web application — an AI-powered workplace productivity assistant for students and graduates with the tagline "Helping you find your neXt step."

Core scope:
1. Layout & Navigation:
- Responsive layout with desktop sidebar, top header, and mobile hamburger drawer.
- Navigation links: Dashboard, Smart Email Generator, Meeting Notes Summarizer, AI Task Planner, AI Research Assistant, AI Chatbot.
- Active item highlighting.

2. Branding:
- Brand name "AI neXtstep" with a visually distinctive 'X' styled as a waypoint/destination marker.
- Tagline: "Helping you find your neXt step."
- Clean SaaS aesthetic, light/neutral tones, crisp borders, subtle shadows, waypoint/route accent accents.

3. Dashboard:
- Hero header with brand, tagline, and intro copy.
- 5 feature cards with icons, titles, descriptions, and "Open" navigation buttons.

4. Reusable AI Tool Page Template & 5 Tools (with realistic mock AI generators, loading states, validation, editable output, copy, regenerate, clear buttons, and AI disclaimer "AI-generated content may contain errors. Please review before use."):
- Tool 1: Smart Email Generator (purpose/context textarea, recipient input, tone dropdown [Professional, Formal, Friendly, Concise], key points textarea).
- Tool 2: Meeting Notes Summarizer (meeting title optional, raw notes textarea, structured output with overview, key points, decisions, action items, deadlines).
- Tool 3: AI Task Planner (goal textarea, tasks/requirements textarea, deadline optional, priority selector, structured task list output).
- Tool 4: AI Research Assistant (research topic textarea, context optional, output type selector [Research Summary, Key Concepts, Research Questions, Literature Review Outline, Research Plan], structured synthesis).
- Tool 5: AI Chatbot (simple conversation view with initial greeting "Hi! I’m your AI neXtstep assistant. I can help with workplace communication, productivity, research and career preparation. What’s your neXt step?", message bubbles, input field, send button, clear chat).

Pure client-side MVP without authentication, database, or external API keys needed.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ade209d4-d734-4a8e-897c-59bbd38816f1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
