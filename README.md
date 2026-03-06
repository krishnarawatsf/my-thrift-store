# ThriftStore E-Commerce

A full-stack thrift/streetwear e-commerce platform built with Next.js 14, TypeScript, Tailwind CSS, and Supabase PostgreSQL.

## Features

- ✅ Homepage with hero banner, collections, and featured products
- ✅ Product listing by category (Jackets, Jerseys, Shirts, Caps, Bottoms, Accessories)
- ✅ Detailed product pages with size selection
- ✅ Shopping cart with persistent state management (Zustand)
- ✅ Checkout flow with order creation
- ✅ Admin dashboard for product management
- ✅ User authentication with Supabase Auth
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Docker setup for local development
- ✅ Vercel deployment ready

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Dev Environment**: Docker

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

### Installation

1. **Clone and install**:
   ```bash
   npm install
   ```

2. **Create `.env.local`**:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Add Supabase credentials**:
   - Get your keys from [Supabase Dashboard](https://app.supabase.com)
   - Add them to `.env.local`

4. **Set up Supabase database**:
   Create these tables in your Supabase project:

   ```sql
   -- Products table
   CREATE TABLE products (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     price INTEGER NOT NULL,
     description TEXT,
     category TEXT NOT NULL,
     images TEXT[],
     sizes TEXT[],
     stock INTEGER DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Orders table
   CREATE TABLE orders (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID,
     items JSONB NOT NULL,
     total INTEGER NOT NULL,
     status TEXT DEFAULT 'pending',
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Categories table
   CREATE TABLE categories (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     slug TEXT UNIQUE NOT NULL,
     image_url TEXT
   );
   ```

5. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Docker Setup

Run with Docker:

```bash
docker-compose up
```

This will start the Next.js development server with hot reload on port 3000.

## Project Structure

```
my-thrift-store/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   ├── collections/[slug]/  # Category pages
│   ├── products/[id]/       # Product detail pages
│   ├── cart/                # Shopping cart
│   └── api/                 # API routes
├── components/              # Reusable components
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── store.ts            # Zustand cart store
├── public/                  # Static assets
├── docker-compose.yml
├── Dockerfile
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Building for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
vercel --prod
```

## API Routes

- `GET /api/products` - Fetch all products
- `POST /api/orders` - Create a new order

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL         # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Your Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY        # Your Supabase service role key (server-only)
```

## Contributing

Create a feature branch and make changes:

```bash
git checkout -b feature/my-feature
git commit -m "Add my feature"
git push origin feature/my-feature
```
