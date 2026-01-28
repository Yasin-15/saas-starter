# 🚀 SaaS Starter Kit

A production-ready **Multi-Tenant SaaS Starter** built with modern web technologies. This starter kit provides a solid foundation for building scalable SaaS applications with authentication, multi-tenancy, role-based access control, and a beautiful dashboard interface.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

### 🏢 Multi-Tenancy
- **Organization-based data isolation** - Each tenant has completely isolated data
- **Automatic tenant creation** on user registration
- **Tenant switching** support for users belonging to multiple organizations
- **Custom branding** per tenant (logo, colors, timezone)

### 🔐 Authentication & Authorization
- **Secure authentication** with NextAuth.js v4
- **Credential-based login** with bcrypt password hashing
- **Protected routes** with middleware
- **Session management** with JWT tokens
- **Role-Based Access Control (RBAC)** with 4 roles:
  - `OWNER` - Full control over the organization
  - `ADMIN` - Administrative privileges
  - `MEMBER` - Standard user access
  - `VIEWER` - Read-only access

### 💾 Database & ORM
- **PostgreSQL** database with Prisma Accelerate
- **Type-safe database queries** with Prisma Client
- **Database migrations** and seeding support
- **Optimized queries** with proper indexing
- **Audit logging** for tracking user actions

### 🎨 Modern UI/UX
- **Responsive design** that works on all devices
- **Dark mode support** with theme provider
- **Beautiful dashboard** with sidebar navigation
- **Lucide React icons** for consistent iconography
- **Tailwind CSS** for utility-first styling
- **Smooth animations** with tailwindcss-animate
- **Split-screen auth pages** with custom illustrations

### 📊 Dashboard Features
- **Overview Dashboard** - Key metrics and analytics
- **Projects Management** - Create and manage projects
- **Team Management** - Invite and manage team members with:
  - Email-based invitations with unique tokens
  - Role assignment (Owner, Admin, Member, Viewer)
  - Invitation expiration (7 days)
  - Pending invitation tracking
  - Member removal with permission checks
  - Beautiful invitation acceptance page
- **Settings** - Organization and user preferences
- **Billing** - Subscription and payment management

### 🛠️ Developer Experience
- **TypeScript** for type safety
- **ESLint** for code quality
- **Hot Module Replacement** for fast development
- **API Routes** with Next.js App Router
- **Zod** for runtime validation
- **Class Variance Authority** for component variants

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS 4.0 |
| **Database** | PostgreSQL (Prisma Accelerate) |
| **ORM** | Prisma 5.22.0 |
| **Authentication** | NextAuth.js 4.24.13 |
| **Password Hashing** | bcrypt 6.0.0 |
| **Validation** | Zod 4.3.6 |
| **Icons** | Lucide React 0.563.0 |
| **Utilities** | clsx, tailwind-merge |
| **Deployment** | Netlify (configured) |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm** or **yarn** package manager
- **PostgreSQL** database (or Prisma Accelerate account)
- **Git** for version control

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd saas-starter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# NextAuth
NEXTAUTH_SECRET="your_random_secret_key_here"
NEXTAUTH_URL="http://localhost:3000"
```

**Generate a secure secret:**
```bash
openssl rand -base64 32
```

### 4. Database Setup

Push the Prisma schema to your database:

```bash
npx prisma db push
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 5. Seed the Database (Optional)

```bash
npm run seed
```

This will create sample data including an admin user.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
saas-starter/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
├── public/
│   └── images/                # Static images and assets
├── src/
│   ├── app/
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth configuration
│   │   │   ├── projects/      # Projects API
│   │   │   └── team/          # Team management API
│   │   ├── dashboard/         # Protected dashboard pages
│   │   │   ├── billing/       # Billing page
│   │   │   ├── projects/      # Projects page
│   │   │   ├── settings/      # Settings page
│   │   │   └── team/          # Team page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── sidebar.tsx    # Dashboard sidebar
│   │   │   └── topbar.tsx     # Dashboard topbar
│   │   ├── theme-provider.tsx # Theme context provider
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   └── prisma.ts          # Prisma client instance
│   ├── types/
│   │   └── next-auth.d.ts     # NextAuth type extensions
│   └── middleware.ts          # Route protection middleware
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── eslint.config.mjs          # ESLint configuration
├── netlify.toml               # Netlify deployment config
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.mjs         # PostCSS configuration
├── README.md                  # This file
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

---

## 🗄️ Database Schema

The application uses the following main models:

### Core Models

- **User** - User accounts with email/password authentication
- **Tenant** - Organizations/workspaces with custom branding
- **TenantUser** - Many-to-many relationship with roles
- **Subscription** - Billing and subscription management
- **AuditLog** - Activity tracking and audit trail

### Feature Models

- **Project** - Project management
- **Task** - Task tracking
- **Note** - Note-taking
- **ApiKey** - API key management
- **Invitation** - Team invitation management with token-based acceptance

### Roles

- `OWNER` - Organization owner with full permissions
- `ADMIN` - Administrative access
- `MEMBER` - Standard user access
- `VIEWER` - Read-only access

### Subscription Plans

- `FREE` - Free tier
- `PRO` - Professional tier
- `ENTERPRISE` - Enterprise tier

---

## 🔌 API Routes

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth endpoints
  - `/api/auth/signin` - Sign in
  - `/api/auth/signout` - Sign out
  - `/api/auth/session` - Get session

### Projects

- `GET /api/projects` - List all projects for current tenant
- `POST /api/projects` - Create a new project

### Team

- `GET /api/team` - List team members
- `POST /api/team/invite` - Invite team member
- `POST /api/team/accept-invitation` - Accept team invitation
- `POST /api/team/reject-invitation` - Reject team invitation
- `POST /api/team/cancel-invitation` - Cancel pending invitation
- `POST /api/team/remove-member` - Remove team member

---

## 🎨 Customization

### Theming

The application supports dark mode out of the box. Customize colors in `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more variables */
}
```

### Branding

Each tenant can customize:
- Organization name
- Logo
- Primary color
- Timezone

Update these in the Settings page or directly in the database.

---

## 🚢 Deployment

### Netlify (Recommended)

The project includes a `netlify.toml` configuration file.

1. **Connect your repository** to Netlify
2. **Set environment variables** in Netlify dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
3. **Deploy** - Netlify will automatically build and deploy

### Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
# Example Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with sample data |

---

## 🔒 Security

- **Password hashing** with bcrypt (10 rounds)
- **JWT tokens** for session management
- **CSRF protection** via NextAuth
- **Environment variables** for sensitive data
- **SQL injection prevention** via Prisma
- **XSS protection** via React
- **Audit logging** for compliance

---

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm test -- --watch
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library

---

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

## 🗺️ Roadmap

- [x] Team invitation system with email-based invites
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Stripe integration for payments
- [ ] Email notifications for invitations
- [ ] Advanced analytics dashboard
- [ ] API documentation with Swagger
- [ ] Comprehensive test coverage
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)

---

**Built with ❤️ using Next.js and TypeScript**
