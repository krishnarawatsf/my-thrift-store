"""
FastAPI server for ThriftStore
Main application with all API routes
"""
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from datetime import datetime
import uuid
from models import (
    Product, ProductCreate, ProductUpdate,
    Category, CategoryCreate,
    Order, OrderCreate,
    CategoryCreate
)
from database import MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_ORDERS, get_supabase

# Initialize FastAPI app
app = FastAPI(
    title="ThriftStore API",
    description="API for the ThriftStore e-commerce platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (replace with database in production)
products_db = {p["id"]: p for p in MOCK_PRODUCTS}
categories_db = {c["id"]: c for c in MOCK_CATEGORIES}


# ==================== PRODUCT ROUTES ====================

@app.get("/api/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    limit: Optional[int] = None,
    offset: Optional[int] = 0,
    featured: Optional[bool] = False
):
    """Get all products with optional filtering"""
    products = list(products_db.values())
    
    # Filter by category
    if category:
        products = [p for p in products if p.get("category") == category]
    
    # Limit results
    if limit:
        products = products[offset:offset + limit]
    else:
        products = products[offset:]
    
    return products


@app.get("/api/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a specific product by ID"""
    product = products_db.get(product_id)
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product


@app.post("/api/admin/products", response_model=Product)
async def create_product(product: ProductCreate):
    """Create a new product (admin only)"""
    product_id = str(uuid.uuid4())
    new_product = {
        "id": product_id,
        **product.dict(),
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    
    products_db[product_id] = new_product
    return new_product


@app.put("/api/admin/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductUpdate):
    """Update a product (admin only)"""
    if product_id not in products_db:
        raise HTTPException(status_code=404, detail="Product not found")
    
    existing = products_db[product_id]
    update_data = product.dict(exclude_unset=True)
    updated = {**existing, **update_data, "updated_at": datetime.now().isoformat()}
    
    products_db[product_id] = updated
    return updated


@app.delete("/api/admin/products/{product_id}")
async def delete_product(product_id: str):
    """Delete a product (admin only)"""
    if product_id not in products_db:
        raise HTTPException(status_code=404, detail="Product not found")
    
    del products_db[product_id]
    return {"message": "Product deleted successfully"}


# ==================== CATEGORY ROUTES ====================

@app.get("/api/categories", response_model=List[Category])
async def get_categories():
    """Get all categories"""
    return list(categories_db.values())


@app.post("/api/admin/categories", response_model=Category)
async def create_category(category: CategoryCreate):
    """Create a new category (admin only)"""
    category_id = category.name.lower().replace(" ", "-")
    
    if category_id in categories_db:
        raise HTTPException(status_code=400, detail="Category already exists")
    
    new_category = {
        "id": category_id,
        **category.dict(),
        "product_count": 0
    }
    
    categories_db[category_id] = new_category
    return new_category


@app.put("/api/admin/categories/{category_id}", response_model=Category)
async def update_category(category_id: str, category: CategoryCreate):
    """Update a category (admin only)"""
    if category_id not in categories_db:
        raise HTTPException(status_code=404, detail="Category not found")
    
    categories_db[category_id].update(category.dict(exclude_unset=True))
    return categories_db[category_id]


@app.delete("/api/admin/categories/{category_id}")
async def delete_category(category_id: str):
    """Delete a category (admin only)"""
    if category_id not in categories_db:
        raise HTTPException(status_code=404, detail="Category not found")
    
    del categories_db[category_id]
    return {"message": "Category deleted successfully"}


# ==================== ORDER ROUTES ====================

@app.post("/api/orders", response_model=Order)
async def create_order(order: OrderCreate):
    """Create a new order"""
    order_id = str(uuid.uuid4())
    
    new_order = {
        "id": order_id,
        **order.dict(),
        "status": "Processing",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    
    MOCK_ORDERS[order_id] = new_order
    
    # TODO: Process payment via payment gateway
    # TODO: Send confirmation email
    # TODO: Update product inventory
    
    return new_order


@app.get("/api/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get order details by ID"""
    order = MOCK_ORDERS.get(order_id)
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return order


# ==================== HEALTH CHECK ====================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "service": "ThriftStore API"}


# ==================== ROOT ====================

@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "message": "Welcome to ThriftStore API",
        "docs": "/docs",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
