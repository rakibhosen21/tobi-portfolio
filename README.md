# Tobi — Web3 portfolio

Personal hiring site for **Tobi** (`@ox_tobiiii`): creator, community, content.

## Deploy on Vercel

1. Import this GitHub repo in [Vercel](https://vercel.com/new).
2. Framework preset: **Vite** (or Other). Build command: `npm run build`.
3. Add a **Neon Postgres** database (Vercel Marketplace → Neon) so hire messages persist.
4. Environment variables (Vercel → Settings → Environment Variables):

| Name | Notes |
|---|---|
| `DATABASE_URL` | Neon connection string (added automatically if you attach Neon) |
| `BETTER_AUTH_SECRET` | Random 32+ character string |
| `BETTER_AUTH_URL` | Your production URL, e.g. `https://your-app.vercel.app` |

5. Deploy. First admin visit: sign up at `/admin`, then check **Inbox** for Hire Me messages.

No X API keys needed.

## Edit copy

Public identity lives in `src/lib/site-config.ts` (name, bio, contact, services, projects).
