# FlowAI Marketing Site

Next.js App Router marketing site with Tailwind CSS.

## Scripts
- dev: Start dev server
- build: Production build
- start: Run production server
- lint: Next.js lint

## Environment
Copy `.env.local.example` to `.env.local` and fill values.

## Deploy (Vercel)
- Connect GitHub repo and set Production branch.
- Push to trigger build and deploy.
- Add custom domains: `orkx.in` and `www.orkx.in`.
- Set `orkx.in` as Primary; `www` will redirect to apex (also enforced via next.config.js and vercel.json).

## DNS (at registrar)
- A @ → 76.76.21.21
- CNAME www → cname.vercel-dns.com
- (If prompted) TXT verification from Vercel

## Cache / Redeploy
- If content is stale, redeploy in Vercel → Deployments → Redeploy.