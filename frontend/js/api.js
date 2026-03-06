// API Client - Fetch wrapper for all API calls
class API {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    // GET /products - Fetch all products
    async getProducts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/api/products${queryString ? '?' + queryString : ''}`;
        return this.request(endpoint);
    }

    // GET /products/{id} - Fetch single product
    async getProduct(productId) {
        return this.request(`/api/products/${productId}`);
    }

    // GET /categories - Fetch all categories
    async getCategories() {
        return this.request('/api/categories');
    }

    // POST /orders - Create new order
    async createOrder(orderData) {
        return this.request('/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }

    // GET /orders/{id} - Fetch order by ID
    async getOrder(orderId) {
        return this.request(`/api/orders/${orderId}`);
    }

    // Admin endpoints
    
    // POST /admin/products - Create new product
    async createProduct(productData) {
        return this.request('/api/admin/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }

    // PUT /admin/products/{id} - Update product
    async updateProduct(productId, productData) {
        return this.request(`/api/admin/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }

    // DELETE /admin/products/{id} - Delete product
    async deleteProduct(productId) {
        return this.request(`/api/admin/products/${productId}`, {
            method: 'DELETE'
        });
    }

    // POST /admin/categories - Create category
    async createCategory(categoryData) {
        return this.request('/api/admin/categories', {
            method: 'POST',
            body: JSON.stringify(categoryData)
        });
    }

    // PUT /admin/categories/{id} - Update category
    async updateCategory(categoryId, categoryData) {
        return this.request(`/api/admin/categories/${categoryId}`, {
            method: 'PUT',
            body: JSON.stringify(categoryData)
        });
    }

    // DELETE /admin/categories/{id} - Delete category
    async deleteCategory(categoryId) {
        return this.request(`/api/admin/categories/${categoryId}`, {
            method: 'DELETE'
        });
    }
}

// Create global API instance
const api = new API();
