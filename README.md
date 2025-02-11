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

### Toast

```typescript
import { toast } from "@/hooks/use-toast";

toast({
  title: "Success",
  description: "Data saved successfully",
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

## Supabase Data Helpers

### Basic CRUD Operations

```typescript
import { getData, insertData, updateData, deleteData, upsertData } from "@/lib/supabase-helpers";

// Define your type
interface User {
  id: string;
  name: string;
  email: string;
}

// Fetch with options
const users = await getData<User>('users', {
  select: 'id, name, email',
  order: { column: 'created_at', ascending: false },
  filter: [{ column: 'role', operator: 'eq', value: 'admin' }],
  limit: 10
});
```

### Real-time Subscriptions

```typescript
import { supabase } from "@/lib/supabase";

// Subscribe to table changes
const subscription = supabase
  .channel('table-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'users' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();

// Cleanup subscription
subscription.unsubscribe();
```

### Advanced Queries

```typescript
// Join tables
const posts = await getData('posts', {
  select: 'id, title, user:users(name)',
  filter: [{ column: 'published', operator: 'eq', value: true }]
});

// Full text search
const results = await getData('posts', {
  filter: [{ column: 'title', operator: 'ilike', value: '%search term%' }]
});

// Range queries
const recentPosts = await getData('posts', {
  filter: [{ 
    column: 'created_at', 
    operator: 'gte', 
    value: new Date(Date.now() - 86400000).toISOString() 
  }]
});
```

### Batch Operations

```typescript
// Batch insert
const users = await insertData<User>('users', [
  { name: 'John', email: 'john@example.com' },
  { name: 'Jane', email: 'jane@example.com' }
]);

// Batch update
const updates = await updateData<User>('users', 
  ['id1', 'id2'], 
  { status: 'active' }
);
```

### Error Handling

```typescript
try {
  const data = await getData('nonexistent_table');
} catch (error) {
  if (error instanceof PostgrestError) {
    console.error('Database error:', error.message);
  }
}
```

### Type Safety

```typescript
// Define strict types for your tables
interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
}

// Get full type safety
const posts = await getData<Post>('posts', {
  select: 'id, title, content',
  order: { column: 'created_at', ascending: false }
});
```

