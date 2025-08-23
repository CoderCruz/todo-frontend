Overview
A minimal task manager built with Next.js (App Router, TypeScript) and Tailwind CSS. It consumes the Express/Prisma API for CRUD operations on tasks.
Tech
Next.js (App Router, React 18)
TypeScript
Tailwind CSS
Getting Started
1) Prerequisites
Node.js 18+ (LTS recommended)
The back-end API running locally (see the todo-backend repo README)
A .env.local file (see below)
2) Environment Variables
Create ./.env.local based on the example below:

# .env.local
# Base URL for the back-end API
NEXT_PUBLIC_API_URL=http://localhost:4000

# install
npm install
# or: pnpm install / yarn

# dev
npm run dev
# opens http://localhost:3000

npm run build
npm run start

