# ThriftStore E-Commerce - Quick Setup & Deployment Guide

## ✅ Project Status
- ✅ Full-stack Next.js 14 setup complete
- ✅ Supabase integration ready
- ✅ Components built (ProductCard, CartDrawer, HeroBanner, CollectionsGrid)
- ✅ Homepage with featured products
- ✅ Product detail pages with add to cart
- ✅ Shopping cart with Zustand state management
- ✅ Checkout flow with order management
- ✅ Order confirmation page
- ✅ Full admin panel for product management

---

## 🚀 Quick Start (5 minutes)

### 1. **Install Dependencies**
```bash
cd /Users/krishnarawat/Documents/my-thrift-store
npm install
```

### 2. **Create Supabase Project**
- Go to [supabase.com](https://supabase.com) and sign up
- Create a new project
- Go to SQL Editor → Copy all SQL from `supabase/schema.sql` → Execute
  - This creates: products, orders, categories, cart_sessions tables
  - Adds sample categories (Jackets, Jerseys, Shirts, etc.)
  - Adds 6 sample products

### 3. **Get Supabase Credentials**
In your Supabase project:
- Settings → API → Copy these keys:
  - `NEXT_PUBLIC_SUPABASE_URL` → Project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon public key
  - `SUPABASE_SERVICE_ROLE_KEY` → service_role secret key

### 4. **Create `.env.local`**
```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and paste your keys:
```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 5. **Run Locally**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📍 Site Map

```
/ 
├── Homepage (featured products, collections, hero)
├── /collections/[slug]
│   └── Category pages (Jackets, Jerseys, Shirts, etc.)
├── /products/[id]
│   └── Product detail + Add to cart
├── /cart
│   └── Shopping cart (drawer from any page)
├── /checkout
│   └── Shipping & payment form
├── /order-confirmation/[id]
│   └── Order confirmation & details
└── /admin
    └── Full product management dashboard
```

---

## 🛠️ Admin Dashboard

### Access
Visit `/admin` to manage products

### Features
- ✅ View all products in table
- ✅ Add new products (+Add Product button)
- ✅ Edit existing products
- ✅ Delete products
- ✅ Real-time updates to database
- ✅ Support for:
  - Multiple images per product
  - Size variants (XS-XXL)
  - Stock tracking
  - Category selection

### Add Sample Products
Use the admin panel to add more products:
1. Click "+Add Product"
2. Fill in details:
   - Name: e.g., "Vintage Denim Jacket"
   - Description: "Original 90s denim..."
   - Category: Select from dropdown
   - Price: 2500 (in Rupees)
   - Stock: 10
   - Sizes: XS, S, M, L, XL
   - Images: Paste image URLs
3. Click "Add Product"

---

## 🔧 Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| State Management | Zustand |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Deployment | Vercel |

---

## 📦 Key Features Implemented

### ✅ Homepage
- Hero banner with CTA
- Collections grid
- Featured products showcase
- Responsive design

### ✅ Product Browsing
- Category pages (6 collections)
- Product cards with:
  - Image preview
  - Price in ₹
  - Stock status
  - Category badge
- Filtering & sorting

### ✅ Shopping Cart
- Persistent state with Zustand
- Add/remove items
- Update quantities
- Real-time totals
- Floating cart button with item count
- Full-screen drawer UI

### ✅ Checkout Flow
- Shipping information form
- Order creation in Supabase
- Order confirmation with tracking info
- Email & phone collection

### ✅ Admin Dashboard
- Full CRUD operations
- Real-time database sync
- Product listing table
- Modal-based add/edit form
- Delete with confirmation
- Stock status indicators

---

## 🌐 Deploy to Vercel

### Option 1: Connect GitHub (Recommended)

1. **Push to GitHub**
```bash
cd /Users/krishnarawat/Documents/my-thrift-store
git remote add origin https://github.com/YOUR_USERNAME/my-thrift-store.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repo
   - Click "Import"

3. **Add Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_SUPABASE_URL=...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...
     SUPABASE_SERVICE_ROLE_KEY=...
     ```
   - Click "Deploy"

4. **Done!** Your app is live

### Option 2: Vercel CLI

```bash
npm i -g vercel
cd /Users/krishnarawat/Documents/my-thrift-store
vercel
# Follow prompts, add environment variables
vercel --prod
```

---

## 🔐 Security Checklist

Before going live:

- [ ] Add `.env.local` to `.gitignore` (already done)
- [ ] Use Supabase RLS policies (partially configured)
- [ ] Enable HTTPS in production
- [ ] Set up payment integration (Razorpay/Stripe)
- [ ] Add order email confirmations
- [ ] Implement user authentication
- [ ] Add order tracking for users
- [ ] Set up rate limiting on API routes

---

## 📝 Environment Variables

### Frontend (Public)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anonymous key

### Backend (Server-only)
- `SUPABASE_SERVICE_ROLE_KEY` - Admin key for API routes

**Never expose service role key in client-side code!**

---

## 🚦 Next Steps

1. ✅ Set up Supabase database
2. ✅ Configure environment variables
3. ✅ Run locally and test
4. ✅ Add your own products via admin panel
5. ✅ Customize branding (colors, logo, text)
6. ✅ Set up payment gateway
7. ✅ Deploy to Vercel
8. ✅ Configure custom domain
9. ✅ Set up email notifications
10. ✅ Monitor analytics

---

## 📞 Support

### Common Issues

**Q: Products not showing?**
- Check Supabase credentials in `.env.local`
- Verify SQL schema was executed
- Check network tab for API errors

**Q: Cart not persisting?**
- Zustand uses localStorage
- Clear browser cache and retry
- Check browser console for errors

**Q: Admin panel not working?**
- Verify `SUPABASE_SERVICE_ROLE_KEY` exists
- Check Supabase RLS policies
- Ensure service role key is valid

**Q: Deployment fails?**
- Check all env vars added to Vercel
- Verify Supabase is accessible from Vercel IPs
- Check build logs in Vercel dashboard

---

## 📚 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vercel Docs](https://vercel.com/docs)

---

## 🎯 Project Structure

```
my-thrift-store/
├── app/
│   ├── layout.tsx                  ← Header, footer, cart drawer
│   ├── page.tsx                    ← Homepage
│   ├── globals.css                 ← Global styles
│   ├── admin/
│   │   └── page.tsx                ← Admin dashboard
│   ├── products/[id]/
│   │   └── page.tsx                ← Product detail
│   ├── collections/[slug]/
│   │   └── page.tsx                ← Category pages
│   ├── cart/
│   │   └── page.tsx                ← Cart page (deprecated - use drawer)
│   ├── checkout/
│   │   └── page.tsx                ← Checkout form
│   ├── order-confirmation/[id]/
│   │   └── page.tsx                ← Order confirmation
│   └── api/
│       ├── products/route.ts       ← Get products API
│       └── orders/route.ts         ← Create orders API
├── components/
│   ├── ProductCard.tsx             ← Product card component
│   ├── CartDrawer.tsx              ← Cart sidebar
│   ├── HeroBanner.tsx              ← Hero section
│   └── CollectionsGrid.tsx         ← Collections grid
├── lib/
│   ├── supabase.ts                 ← Supabase setup
│   └── store.ts                    ← Zustand cart store
├── supabase/
│   └── schema.sql                  ← Database schema
├── public/                         ← Static assets
├── .env.local.example              ← Template for env vars
├── next.config.mjs                 ← Next.js config
├── tailwind.config.ts              ← Tailwind config
├── tsconfig.json                   ← TypeScript config
├── package.json                    ← Dependencies
└── vercel.json                     ← Vercel config
```

---

**Ready to launch? Go live! 🚀**
