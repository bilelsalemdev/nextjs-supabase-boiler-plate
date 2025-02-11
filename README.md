# Next.js Enterprise Boilerplate

A production-ready Next.js boilerplate equipped with enterprise-level features like authentication, authorization, form handling, and data management.

## 🚀 Features

- **Next.js 14** with App Router
- **Supabase Authentication**
- **TypeScript** for robust type safety
- **Form Handling** with Formik
- **Validation** using Zod
- **UI Components** powered by shadcn/ui
- **State Management** via TanStack Query
- **Table Management** using TanStack Table
- **Routing** with TanStack Router
- **Tailwind CSS** for styling
- **ESLint** for code linting
- **Prettier** for code formatting
- **Strict Mode** enabled
- **PWA** ready
- **SEO** optimized

## 📦 Pre-built Components

- **Data Tables** with sorting and pagination
- **Authentication Forms** for login and signup
- **UI Components** from shadcn/ui
- **Toast Notifications** for alerts
- **Responsive Layouts** optimized for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 20.10.0 or later
- PNPM 8.9.0 or later
- Docker and Docker Compose (optional)

### Installation

This project uses PNPM as the package manager. If you don't have PNPM installed, you can install it with:

```bash
npm install -g pnpm
```

Then, install the project dependencies:

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Test

```bash
pnpm test
```

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nextjs-enterprise-boilerplate.git
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
├── src/
│   ├── app/               # App router pages
│   ├── components/        # Reusable components
│   │   ├── ui/            # shadcn/ui components
│   │   └── data-table/    # Table components
│   ├── lib/               # Utility functions
│   ├── providers/         # React context providers
│   ├── schemas/           # Zod schemas
│   └── types/             # TypeScript types
├── public/                # Static files
└── ...config files
```

## 🔧 Configuration Details

### TanStack Query

- **Stale Time:** 60 seconds
- **React Query Devtools:** Enabled in development
- **Error Handling:** Built-in

### Tailwind CSS

- Custom color schemes
- Integrated with shadcn/ui
- Animation utilities
- Extended responsive breakpoints

## 📚 Code Examples

### Data Table

```typescript
import { DataTable } from "@/components/data-table/data-table";

<DataTable columns={columns} data={data} />
```

### Authentication

```typescript
import { supabase } from "@/lib/supabase";

const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

### Running with Docker

#### Development

```bash
pnpm docker:dev
```

#### Production

```bash
# Build the images
pnpm docker:build

# Start the containers
pnpm docker:up

# View logs
pnpm docker:logs

# Stop the containers
pnpm docker:down
```

