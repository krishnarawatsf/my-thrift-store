# Copilot Instructions for ThriftStore E-Commerce

## Project Overview
This is a full-stack thrift/streetwear e-commerce store built with:
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **State**: Zustand for cart management
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## Key Conventions

### Always Follow These Rules
1. **Always use TypeScript** - strict mode enabled
2. **Always use Tailwind CSS** - no CSS modules or styled-components
3. **Always use App Router** - not the old Pages Router
4. **Currency**: All prices in Indian Rupees (₹)
5. **Supabase Over State** - use DB calls instead of local state for persistence
6. **Server Components by Default** - use 'use client' only when needed (interactivity)

### File Structure
```
app/                  → Routes and pages
├── api/             → API routes (use service role key)
├── (auth)/          → Auth pages (optional)
├── collections/     → Category pages
├── products/        → Product detail pages
└── cart/            → Shopping cart page

components/         → Reusable React components

lib/
├── supabase.ts     → Client & server Supabase instances
└── store.ts        → Zustand cart store

public/             → Static assets
```

### Database Schema
```
products:
  - id (UUID)
  - name (TEXT)
  - price (INTEGER - in Rupees)
  - description (TEXT)
  - category (TEXT)
  - images (TEXT[])
  - sizes (TEXT[])
  - stock (INTEGER)
  - created_at (TIMESTAMP)

orders:
  - id (UUID)
  - user_id (UUID, optional)
  - items (JSONB)
  - total (INTEGER - in Rupees)
  - status (TEXT: pending|processing|shipped|delivered)
  - created_at (TIMESTAMP)

categories:
  - id (UUID)
  - name (TEXT)
  - slug (TEXT, UNIQUE)
  - image_url (TEXT)
```

### Important Patterns

#### Creating API Routes
Always use Supabase server client (service role):
```typescript
import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const supabase = createServerSupabaseClient()
  // Use service role for privileged operations
}
```

#### Client Side Cart Management
Use Zustand store for cart state:
```typescript
import { useCart } from '@/lib/store'

export default function MyComponent() {
  const { items, addItem, removeItem, total } = useCart()
  // Use cart state
}
```

#### Fetching Data on Server
Use server components with async fetch:
```typescript
export default async function Page() {
  const { data } = await supabase.from('products').select('*')
  return <div>{/* render */}</div>
}
```

### What NOT to Do
❌ Don't use CSS modules or styled-components
❌ Don't store persistent data in React state
❌ Don't use Pages Router (/pages directory)
❌ Don't use regular Supabase client in API routes (use service role)
❌ Don't hardcode prices without ₹ symbol
❌ Don't create API routes without proper error handling

## Testing Locally
```bash
npm install
npm run dev
# Open http://localhost:3000
```

With Docker:
```bash
docker-compose up
```

## Deployment
- Main branch auto-deploys to Vercel
- Environment variables configured in Vercel dashboard
- Database migrations handled in Supabase console
