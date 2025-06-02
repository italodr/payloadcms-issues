# Payload CMS reproduction repository

This repository is used to reproduce the issue with Payload CMS.

## Attributes

- **Database**: postgres

## Database setup

1. Run `sh start-database.sh` (needs docker installed)
2. Run `pnpm payload generate:types`
3. Run `pnpm payload generate:importmap`
4. Run `pnpm install`
5. Run `pnpm run dev`
6. Open the browser and go to `http://localhost:3000`
