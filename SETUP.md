# ThriftStore - Setup & Running Guide

## Quick Start

### Start Frontend (Local Development)

```bash
cd frontend
python3 -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000)

### Start Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python3 main.py
```

Backend API: [http://localhost:8000](http://localhost:8000)
API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Full Setup Instructions

### Prerequisites
- Python 3.9 or higher
- macOS (or Linux/Windows with bash)
- Modern web browser

### Step 1: Frontend Setup

```bash
# Navigate to frontend directory
cd /Users/krishnarawat/Documents/my-thrift-store/frontend

# Start HTTP server on port 3000
python3 -m http.server 3000

# Keep this terminal open!
```

Visit `http://localhost:3000` to see the homepage.

### Step 2: Backend Setup

**In a new terminal:**

```bash
# Navigate to backend directory
cd /Users/krishnarawat/Documents/my-thrift-store/backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python3 main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Step 3: Verify Setup

1. **Frontend**: 
   - Open [http://localhost:3000](http://localhost:3000)
   - Should see homepage with categories and products

2. **Backend API**:
   - Open [http://localhost:8000/docs](http://localhost:8000/docs)
   - Should see interactive API documentation
   - Try "Try it out" on GET /api/products endpoint

3. **Cart Functionality**:
   - Click "Shop" → "Dresses" category
   - Click on a product
   - Click "Add to Cart" (select size first)
   - Click cart icon to view cart

4. **Admin Dashboard**:
   - Open [http://localhost:3000/admin.html](http://localhost:3000/admin.html)
   - Try adding a product or category

---

## File Structure Overview

### Frontend (`/frontend`)
```
frontend/
├── css/
│   ├── style.css       - Global styles, grids, buttons, product cards
│   ├── header.css      - Navigation & cart drawer
│   └── footer.css      - Footer styling
├── js/
│   ├── config.js       - API URL, categories, sizes constants
│   ├── api.js          - Fetch wrapper for all API calls
│   ├── cart.js         - LocalStorage cart + UI management
│   ├── home.js         - Homepage: load categories & featured products
│   ├── collections.js  - Collections page: sorting & filtering
│   ├── product.js      - Product detail: UI & add to cart
│   ├── checkout.js     - Checkout form & order creation
│   ├── order-confirmation.js - Order details display
│   └── admin.js        - Admin CRUD operations
├── index.html          - Homepage
├── collections.html    - Shop/Categories page
├── product.html        - Product detail page
├── checkout.html       - Checkout form
├── order-confirmation.html - Order confirmation
└── admin.html          - Admin dashboard
```

### Backend (`/backend`)
```
backend/
├── main.py        - FastAPI app with all endpoints
├── models.py      - Pydantic models for data validation
├── database.py    - Supabase client & mock data
├── requirements.txt - Python dependencies
└── .env.example   - Environment variables template
```

---

## What Each Page Does

### 1. **Homepage** (`index.html`) - `http://localhost:3000`
- Shows product categories
- Shows featured products
- Cart icon in header
- Link to shop/collections

### 2. **Collections** (`collections.html`) - `http://localhost:3000/collections.html`
- Browse products by category
- Sort products (price, name, newest)
- Click to view product details
- Add items to cart from grid

### 3. **Product Detail** (`product.html`) - `http://localhost:3000/product.html?id=1`
- Full product info with description
- Size selector
- Quantity controls
- Stock information
- Add to cart button

### 4. **Checkout** (`checkout.html`) - `http://localhost:3000/checkout.html`
- Shipping address form
- Order summary (items, totals)
- Proceed to checkout creates order
- Redirects to confirmation page

### 5. **Order Confirmation** (`order-confirmation.html`) - Auto-redirect after order
- Order number & status
- Shipping address
- Order items list
- Order total

### 6. **Admin Dashboard** (`admin.html`) - `http://localhost:3000/admin.html`
- Add new products
- View product list
- Delete products
- Add categories
- Manage categories

---

## API Endpoints Reference

### Products
```
GET  /api/products                    - List all products (with filters)
GET  /api/products/{id}               - Get single product
POST /api/admin/products              - Create product
PUT  /api/admin/products/{id}         - Update product
DELETE /api/admin/products/{id}       - Delete product
```

### Categories
```
GET  /api/categories                  - List all categories
POST /api/admin/categories            - Create category
PUT  /api/admin/categories/{id}       - Update category
DELETE /api/admin/categories/{id}     - Delete category
```

### Orders
```
POST /api/orders                      - Create new order
GET  /api/orders/{id}                 - Get order details
```

---

## How Data Flows

### Adding Product to Cart
1. User selects size on product page
2. Clicks "Add to Cart"
3. JavaScript calls `cart.add(product, size, qty)`
4. Cart saves to LocalStorage
5. Cart drawer updates with item count
6. Shows success message for 2 seconds

### Creating Order
1. User proceeds to checkout
2. Form validation (all fields required)
3. Frontend sends order data to `POST /api/orders`
4. Backend creates order with unique ID
5. Frontend clears cart
6. Redirects to confirmation page with order ID

### Admin: Add Product
1. Fill product form
2. Click "Add Product"
3. Frontend sends `POST /api/admin/products`
4. Backend creates product in memory (or database)
5. Products table refreshes
6. Success message shown

---

## Troubleshooting

### Port Already in Use

If port 3000 or 8000 is in use:

```bash
# Find process using port 3000
lsof -i :3000

# Kill process (replace PID with actual number)
kill -9 <PID>

# Or use different port
python3 -m http.server 3001
```

### Virtual Environment Not Activated

If you see `python3: command not found` for pip:

```bash
# Make sure you're in backend directory
cd backend

# Activate venv
source venv/bin/activate

# Prompt should show (venv) at start
```

### CORS Error in Browser

Error: `Access to XMLHttpRequest blocked by CORS policy`

Solution: Already handled in main.py with:
```python
allow_origins=["*"]
```

For production, change to specific domain.

### Cart Not Saving

1. Check browser LocalStorage:
   - Open DevTools (F12)
   - Go to Application → LocalStorage
   - Should see `thriftstore_cart` key
   
2. Clear LocalStorage and try again:
   ```javascript
   // In browser console
   localStorage.clear()
   ```

### Products Not Loading

1. Check if backend is running (`http://localhost:8000/health`)
2. Check browser console for errors (F12)
3. Verify API_BASE_URL in config.js matches backend

---

## Running Tests

### Manual Testing

1. **Product Browse Flow**:
   - Homepage → See categories ✓
   - Click category → See products ✓
   - Sort products ✓
   - Click product → See details ✓

2. **Cart Flow**:
   - Select size ✓
   - Add to cart ✓
   - Cart count increases ✓
   - Click cart icon → See items ✓
   - Adjust quantity ✓
   - Remove item ✓

3. **Checkout Flow**:
   - Proceed to checkout ✓
   - Fill form (all fields required) ✓
   - See order summary ✓
   - Click "Place Order" ✓
   - See confirmation page ✓

4. **Admin Flow**:
   - Add new product ✓
   - Fill form & submit ✓
   - See product in list ✓
   - Delete product ✓

### API Testing

Open [http://localhost:8000/docs](http://localhost:8000/docs) and:

1. Try GET /api/products
2. Try GET /api/categories
3. Try POST /api/orders (with sample order data)
4. Try GET /api/orders/{id} (use returned ID from above)

---

## Production Deployment

### Frontend
- Deploy to Vercel, Netlify, or GitHub Pages
- Update API_BASE_URL in config.js to production API URL
- Enable HTTPS

### Backend
- Deploy to Railway, Render, Fly.io, or cloud platform
- Set environment variables (SUPABASE_URL, SUPABASE_KEY)
- Configure CORS for frontend domain
- Add authentication for admin endpoints

---

## Next Steps

1. **Configure Supabase** (optional, currently using mock data)
   - Get URL and Key from supabase.com
   - Create tables (see schema in README.md)
   - Update .env file

2. **Add Payment Processing**
   - Integrate Stripe or PayPal
   - Update checkout.js with payment logic
   - Store payment info securely

3. **Add Authentication**
   - User login/signup
   - Save customer info between orders
   - Order history page

4. **Improve Admin Panel**
   - User authentication required
   - Edit modal for products
   - Inventory alerts
   - Sales analytics

---

## Support

Check browser console (F12 → Console) for JavaScript errors.
Check backend terminal for API errors.

Need help? Check README.md for more details!
