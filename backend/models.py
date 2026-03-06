"""
Pydantic models for ThriftStore API
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# Category Models
class CategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None


class Category(BaseModel):
    id: str
    name: str
    description: Optional[str]
    product_count: Optional[int] = 0

    class Config:
        from_attributes = True


# Product Models
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image: Optional[str] = None
    category: str
    sizes: List[str] = []
    stock: int = 0


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    category: Optional[str] = None
    sizes: Optional[List[str]] = None
    stock: Optional[int] = None


class Product(BaseModel):
    id: str
    name: str
    description: Optional[str]
    price: float
    image: Optional[str]
    category: str
    sizes: List[str]
    stock: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


# Customer Models
class CustomerInfo(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str


# Shipping Models
class ShippingInfo(BaseModel):
    address: str
    city: str
    state: str
    zipcode: str


# Payment Models
class PaymentInfo(BaseModel):
    cardName: str
    cardNumber: str
    expiry: str
    cvv: str


# Order Item Models
class OrderItem(BaseModel):
    productId: str
    name: str
    size: str
    quantity: int
    price: float


# Order Models
class OrderCreate(BaseModel):
    customer: CustomerInfo
    shipping: ShippingInfo
    payment: PaymentInfo
    items: List[OrderItem]
    subtotal: float
    tax: float
    shipping: float
    total: float


class Order(BaseModel):
    id: str
    customer: CustomerInfo
    shipping: ShippingInfo
    items: List[OrderItem]
    subtotal: float
    tax: float
    shipping: float
    total: float
    status: str = "Processing"
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
