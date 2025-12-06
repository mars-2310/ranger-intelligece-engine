# Dashboard: AI Document Processor (Yellow Power Ranger theme)

This dashboard is a Next.js App Router page that provides a simple UI for:
- Semantic search across uploaded documents (calls `/api/semantic-search`)
- Summarization of pasted text (calls `/api/summarize`)

Files added:
- `app/dashboard/page.jsx` — main dashboard page
- `app/dashboard/dashboard.module.css` — theme styles
- `app/dashboard/components/*` — small UI components

Notes / next steps:
- Implement server API routes `/api/documents`, `/api/semantic-search` and `/api/summarize` to connect to your embedding/search and LLM services.
- Hook document storage (S3, database, or local) to the `/api/documents` endpoint.
- Adjust styles to match your brand. The accent color is `#FFD300`.

To try locally:
1. Start your Next.js app (e.g., `pnpm dev` or `npm run dev`).
2. Visit `/dashboard`.
