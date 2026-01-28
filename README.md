# SaaS Starter Kit

A Multi-Tenant SaaS Starter built with Next.js 15, Tailwind CSS, Prisma, and NextAuth.js.

## Features

- **Multi-Tenancy**: Organization-based data isolation.
- **Authentication**: Secure login/signup with NextAuth.js.
- **Database**: PostgreSQL with Prisma ORM.
- **UI/UX**: Modern dashboard with Tailwind CSS and Lucide icons.
- **Role-Based Access Control**: Owner, Admin, Member roles.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup Database**:
   Ensure PostgreSQL is running and update `.env` if needed.
   ```bash
   npx prisma db push
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Visit [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app`: App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Utilities (Prisma, Auth).
- `prisma/schema.prisma`: Database schema.

## Default Login

Register a new account to create your organization automatically.
