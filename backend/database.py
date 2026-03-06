"""
Database configuration and setup
Uses Supabase PostgreSQL or can be configured for local PostgreSQL
"""
import os
from typing import Optional
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Supabase credentials
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

# Create Supabase client
supabase: Optional[Client] = None

if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def get_supabase() -> Client:
    """Get Supabase client instance"""
    if not supabase:
        raise RuntimeError("Supabase not initialized. Check SUPABASE_URL and SUPABASE_KEY")
    return supabase


# Mock data fallback for development
MOCK_PRODUCTS = [
    {
        "id": "1",
        "name": "Vintage Denim Jacket",
        "description": "Classic blue denim jacket from the 90s. Great condition with unique wash.",
        "price": 45.99,
        "image": None,
        "category": "outerwear",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "stock": 5,
        "created_at": "2024-01-01T00:00:00Z"
    },
    {
        "id": "2",
        "name": "Floral Summer Dress",
        "description": "Beautiful floral print sundress, perfect for warm weather.",
        "price": 29.99,
        "image": None,
        "category": "dresses",
        "sizes": ["XS", "S", "M", "L"],
        "stock": 3,
        "created_at": "2024-01-02T00:00:00Z"
    },
    {
        "id": "3",
        "name": "White Graphic Tee",
        "description": "Retro band t-shirt in excellent condition.",
        "price": 15.99,
        "image": None,
        "category": "tops",
        "sizes": ["S", "M", "L", "XL", "2XL"],
        "stock": 8,
        "created_at": "2024-01-03T00:00:00Z"
    },
    {
        "id": "4",
        "name": "High-Waist Black Jeans",
        "description": "Classic high-waisted black jeans, slightly distressed.",
        "price": 34.99,
        "image": None,
        "category": "bottoms",
        "sizes": ["XS", "S", "M", "L"],
        "stock": 6,
        "created_at": "2024-01-04T00:00:00Z"
    },
    {
        "id": "5",
        "name": "Leather Ankle Boots",
        "description": "Brown leather ankle boots in great condition.",
        "price": 55.99,
        "image": None,
        "category": "shoes",
        "sizes": ["5", "6", "7", "8", "9", "10"],
        "stock": 2,
        "created_at": "2024-01-05T00:00:00Z"
    },
    {
        "id": "6",
        "name": "Vintage Leather Belt",
        "description": "Quality leather belt with authentic patina.",
        "price": 19.99,
        "image": None,
        "category": "accessories",
        "sizes": ["One Size"],
        "stock": 4,
        "created_at": "2024-01-06T00:00:00Z"
    }
]

MOCK_CATEGORIES = [
    {"id": "dresses", "name": "Dresses", "description": "Vintage and thrifted dresses", "product_count": 1},
    {"id": "tops", "name": "Tops", "description": "T-shirts, blouses, and more", "product_count": 1},
    {"id": "bottoms", "name": "Bottoms", "description": "Jeans, skirts, and pants", "product_count": 1},
    {"id": "outerwear", "name": "Outerwear", "description": "Jackets and coats", "product_count": 1},
    {"id": "shoes", "name": "Shoes", "description": "Boots, heels, sneakers", "product_count": 1},
    {"id": "accessories", "name": "Accessories", "description": "Belts, bags, scarves", "product_count": 1}
]

MOCK_ORDERS = {}
