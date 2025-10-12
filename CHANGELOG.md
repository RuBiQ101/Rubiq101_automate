# Changelog

All notable changes to this project will be documented in this file.

## [v0.1.0] - 2025-10-12
### Added
- marketing-site: Add `robots.ts` exposing host and sitemap for orkx.in
- marketing-site: Add `sitemap.ts` with core URLs
- marketing-site: Enforce www→apex via `next.config.js` and `vercel.json`
- marketing-site: Align SEO metadata and canonical to https://orkx.in
- marketing-site: Update `.env.local.example` with public URLs for orkx.in
- marketing-site: README with Vercel deploy and DNS steps

### Notes
- After pushing, ensure Vercel Production deployment is green and orkx.in is set as the Primary domain.
