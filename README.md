## Introduction

### This project is a simplified ChatGPT clone developed using Next.js, TypeScript, and Supabase. It focuses on basic chat functionality, message branching, and integrates real-time data synchronization using Supabase's subscription capabilities.

## System Design

### Architecture Overview
1. Frontend Components:

- ChatWindow: Displays the main chat interface.
- MessageEditor: Allows users to edit messages.
- Sidebar: Shows chat history and branches.
2. API Design:

- RESTful APIs for sending, editing, and retrieving messages.
- Supabase subscriptions for real-time updates.
3. Database Schema:

- Users: Stores user information.
- Messages: Contains message content, timestamps, and user associations.
- Branches: Tracks edited messages and related follow-ups.

### Tech Stack
- Frontend: Next.js, TypeScript
- Backend: Supabase (Database & Realtime)
- Styling: CSS / TailwindCSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font. 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
