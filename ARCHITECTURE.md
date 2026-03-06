# ThriftStore Architecture & Verification Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT BROWSER                              │
├─────────────────────────────────────────────────────────────────┤
│ Frontend (Vanilla HTML/CSS/JavaScript)                          │
│ ├── Pages:                                                       │
│ │   ├── index.html (Homepage)                                   │
│ │   ├── collections.html (Product Browsing)                     │
│ │   ├── product.html (Product Details)                          │
│ │   ├── checkout.html (Order Checkout)                          │
│ │   ├── order-confirmation.html (Confirmation)                  │
│ │   └── admin.html (Admin Dashboard)                            │
│ │                                                                │
│ ├── CSS:                                                         │
│ │   ├── style.css (Main styles)                                 │
│ │   ├── header.css (Navigation & cart)                          │
│ │   └── footer.css (Footer)                                     │
│ │                                                                │
│ ├── JavaScript Modules:                                         │
│ │   ├── config.js (API URL, constants)                          │
│ │   ├── api.js (HTTP client)                                    │
│ │   ├── cart.js (Cart management)                               │
│ │   ├── home.js, collections.js, product.js                     │
│ │   ├── checkout.js, order-confirmation.js                      │
│ │   └── admin.js (Admin operations)                             │
│ │                                                                │
│ └── Storage:                                                     │
│     └── LocalStorage (cart data)                                │
│                                                                  │
├─ fetch() ──────────────────────────────────────────────────── HTTP │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│          BACKEND API SERVER (FastAPI - Python)                  │
├─────────────────────────────────────────────────────────────────┤
│ Port: 8000                                                       │
│                                                                  │
│ Routes:                                                          │
│ ├── GET /api/products              → Fetch all products         │
│ ├── GET /api/products/{id}         → Fetch single product       │
│ ├── POST /api/admin/products       → Create product             │
│ ├── PUT /api/admin/products/{id}   → Update product             │
│ ├── DELETE /api/admin/products/{id}→ Delete product             │
│ │                                                                │
│ ├── GET /api/categories            → Fetch all categories       │
│ ├── POST /api/admin/categories     → Create category            │
│ ├── PUT /api/admin/categories/{id} → Update category            │
│ ├── DELETE /api/admin/categories/{id}→ Delete category          │
│ │                                                                │
│ ├── POST /api/orders               → Create order               │
│ ├── GET /api/orders/{id}           → Fetch order                │
│ │                                                                │
│ └── GET /health                    → Health check               │
│                                                                  │
│ Code Structure:                                                  │
│ ├── main.py (FastAPI app + routes)                              │
│ ├── models.py (Pydantic data models)                            │
│ ├── database.py (Supabase client & mock data)                   │
│ └── requirements.txt (Python dependencies)                      │
│                                                                  │
│ Data Storage:                                                    │
│ ├── In-Memory (development: MOCK_PRODUCTS, MOCK_ORDERS)         │
│ └── Optional: Supabase PostgreSQL (production)                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Diagrams

### User Adding Product to Cart
```
Browser (Frontend)              Backend (Python)
        |                              |
        | Click "Add to Cart"         |
        |                              |
        | JavaScript Executes         |
        | cart.add(product, size, qty)|
        |                              |
        | Save to LocalStorage -----> [no API call needed]
        |                              |
        | Update cart UI (count)       |
        | Show success message         |
        |                              |
```

### User Checking Out
```
Browser (Frontend)              Backend (Python)
        |                              |
        | Click "Place Order"         |
        |                              |
        | Validate form               |
        |                              |
        | POST /api/orders ---------> |
        | with order data             | Validate data
        |                              | Create order
        |                              | Save to DB/memory
        |                              |
        | <--------- Response         |
        |  with order ID              |
        |                              |
        | Clear LocalStorage cart      |
        | Redirect to confirmation    |
        |                              |
        | GET /api/orders/{id} -----> |
        |                              | Fetch order
        |                              | details
        | <--------- Order data        |
        |                              |
        | Display order confirmation  |
        |                              |
```

### Admin Adding Product
```
Browser (Admin UI)              Backend (Python)
        |                              |
        | Fill product form           |
        | Click "Add Product"         |
        |                              |
        | POST /api/admin/products -> |
        | with product data           | Validate data
        |                              | Create product ID
        |                              | Save to memory/DB
        |                              |
        | <------- Response           |
        |  (new product)              |
        |                              |
        | GET /api/products --------> |
        |                              | Fetch all
        |                              | products list
        | <------- Products array     |
        |                              |
        | Refresh products table      |
        | Show success message        |
        |                              |
```

## 🧪 Verification Checklist

### Phase 1: Environment Setup
- [ ] Backend virtual environment created
- [ ] All Python packages installed
- [ ] Frontend files exist
- [ ] Can navigate to http://localhost:3000
- [ ] Can navigate to http://localhost:8000/docs

### Phase 2: API Functionality
```bash
# In FastAPI Swagger UI (http://localhost:8000/docs)

[ ] GET /api/products → Returns mock products
[ ] GET /api/products/1 → Returns single product
[ ] GET /api/categories → Returns categories (6 items)
[ ] POST /api/admin/products → Can create product
[ ] POST /api/orders → Can create order
[ ] GET /api/orders/{id} → Can fetch created order
[ ] GET /health → Returns {"status": "ok"}
```

### Phase 3: Frontend Pages
- [ ] Homepage loaded
  - [ ] Categories display correctly
  - [ ] Featured products show
  - [ ] Cart icon visible in header

- [ ] Collections page works
  - [ ] Can filter by category
  - [ ] Can sort (price, name, etc.)
  - [ ] Products grid displays

- [ ] Product detail page
  - [ ] Product info loads
  - [ ] Size selector works
  - [ ] Can adjust quantity
  - [ ] Add to cart button functional

- [ ] Cart functionality
  - [ ] Cart icon shows count
  - [ ] Click cart opens drawer
  - [ ] Can see items in cart
  - [ ] Can remove items
  - [ ] Cart persists on page reload

- [ ] Checkout page
  - [ ] Form fields present
  - [ ] Can fill and submit
  - [ ] Redirects to confirmation

- [ ] Order confirmation
  - [ ] Shows order number
  - [ ] Shows order date
  - [ ] Shows items purchased
  - [ ] Shows total amount

- [ ] Admin dashboard
  - [ ] Can add product
  - [ ] Can delete product
  - [ ] Products table updates
  - [ ] Can manage categories

### Phase 4: Integration Tests
```
[ ] End-to-End Flow:
  1. [ ] Browse products on homepage
  2. [ ] Click category (Dresses)
  3. [ ] See filtered products
  4. [ ] Click product detail
  5. [ ] Select size
  6. [ ] Add to cart
  7. [ ] Cart count increases
  8. [ ] Open cart drawer
  9. [ ] Proceed to checkout
  10. [ ] Fill form
  11. [ ] Click Place Order
  12. [ ] See order confirmation
  13. [ ] Order number displays
```

## 🔍 File Validation

### Frontend Files
```
/frontend/
├── css/
│   ├── style.css         [EXISTS] 790+ lines
│   ├── header.css        [EXISTS] 220+ lines
│   └── footer.css        [EXISTS] 70+ lines
├── js/
│   ├── config.js         [EXISTS] 30+ lines (API URL, constants)
│   ├── api.js            [EXISTS] 100+ lines (API class)
│   ├── cart.js           [EXISTS] 250+ lines (Cart management)
│   ├── home.js           [EXISTS] 60+ lines (Homepage logic)
│   ├── collections.js    [EXISTS] 70+ lines (Collections logic)
│   ├── product.js        [EXISTS] 140+ lines (Product logic)
│   ├── checkout.js       [EXISTS] 90+ lines (Checkout logic)
│   ├── order-confirmation.js [EXISTS] 100+ lines (Confirmation logic)
│   └── admin.js          [EXISTS] 200+ lines (Admin logic)
├── index.html            [EXISTS] HTML5 with cart drawer, footer
├── collections.html      [EXISTS] Category browsing, sort dropdown
├── product.html          [EXISTS] Detail page with image gallery
├── checkout.html         [EXISTS] Checkout form + summary
├── order-confirmation.html [EXISTS] Confirmation display
└── admin.html            [EXISTS] Product/category management
```

### Backend Files
```
/backend/
├── main.py               [EXISTS] FastAPI app, 250+ lines
├── models.py             [EXISTS] Pydantic models
├── database.py           [EXISTS] Mock data + Supabase client
├── requirements.txt      [EXISTS] All dependencies
│   └── fastapi 0.104.1
│   └── uvicorn 0.24.0
│   └── python-dotenv 1.0.0
│   └── pydantic 2.4.2
│   └── sqlalchemy 2.0.23
│   └── supabase 2.3.3
└── .env                  [EXISTS] Empty, ready for config
```

### Documentation Files
```
/root
├── README.md             [EXISTS] Full project docs
├── SETUP.md              [EXISTS] Setup instructions
├── QUICK_START.md        [EXISTS] Quick reference
└── ARCHITECTURE.md       [THIS FILE]
```

## 🚀 Running the Project

### Quick Start (Recommended)

**Terminal 1 - Frontend:**
```bash
cd /Users/krishnarawat/Documents/my-thrift-store/frontend
python3 -m http.server 3000
```
✓ Frontend running at http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd /Users/krishnarawat/Documents/my-thrift-store/backend
source venv/bin/activate
python3 main.py
```
✓ Backend running at http://localhost:8000

### Full Verification (after both running)

```bash
# Terminal 3 - Run checks
cd /Users/krishnarawat/Documents/my-thrift-store

# Check frontend
curl http://localhost:3000

# Check backend health
curl http://localhost:8000/health

# Test API
curl http://localhost:8000/api/products
```

## 📱 Browser Testing Checklist

### What to Test in Each Browser Tab

**Tab 1: Homepage**
- URL: `http://localhost:3000/index.html`
- Expected: Categories + featured products visible
- Action: Click "Shop Collections" or category

**Tab 2: Collections**
- URL: `http://localhost:3000/collections.html?category=dresses`
- Expected: Products filtered by category with sort dropdown
- Action: Try sorting, click product

**Tab 3: Product Detail**
- URL: `http://localhost:3000/product.html?id=1`
- Expected: Product image, description, size selector
- Action: Select size, adjust qty, click "Add to Cart"

**Tab 4: Cart Drawer**
- From any page: Click cart icon in header
- Expected: Item shows in cart with qty controls
- Action: Remove item or proceed to checkout

**Tab 5: Checkout**
- URL: `http://localhost:3000/checkout.html`
- Expected: Form with order summary
- Action: Fill form (all fields required), click Place Order

**Tab 6: Confirmation**
- Auto-redirect after checkout
- Expected: Order number, items, total displayed
- Check: Cart is empty after order

**Tab 7: Admin**
- URL: `http://localhost:3000/admin.html`
- Expected: Product & category management forms
- Action: Add product, see it in products list

## 🔧 Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `lsof -i :3000` then `kill -9 <PID>` |
| Port 8000 in use | Use different port: `python3 main.py --port 8001` |
| venv not activated | `source venv/bin/activate` (check prompt shows `(venv)`) |
| Module not found | Reinstall: `pip install -r requirements.txt` |
| CORS error | Already handled in main.py, check browser console |
| Cart empty | Check LocalStorage in DevTools (Cmd+Option+I) |
| Products not loading | Verify backend is running, check API_BASE_URL |

## 📈 Performance Metrics

### Expected Load Times
- Frontend page load: < 1 second
- API response: < 100ms (with mock data)
- Cart update: Instant (localStorage)

### Expected Storage
- Frontend: ~2MB (HTML/CSS/JS)
- Mock data: ~50KB
- Cart (localStorage): < 100KB per user

## 🎯 Next Milestones

### ✅ Completed
- [x] HTML/CSS/JS frontend structure
- [x] FastAPI backend with mock data
- [x] Cart management with LocalStorage
- [x] Product browsing and filtering
- [x] Order creation flow
- [x] Admin dashboard

### 🔄 In Progress
- [ ] Running and verifying all components

### 📋 To Do
- [ ] Connect to Supabase database
- [ ] Payment gateway integration
- [ ] User authentication
- [ ] Email notifications
- [ ] Deployment (Vercel + Railway/Render)

---

**Created**: ThriftStore Full Stack Architecture
**Stack**: Vanilla HTML/CSS/JavaScript + FastAPI (Python)
**Status**: ✅ Development Ready
