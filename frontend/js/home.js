// Homepage - home.js
document.addEventListener('DOMContentLoaded', async () => {
    await loadCategories();
    await loadFeaturedProducts();
});

async function loadCategories() {
    try {
        const collectionsGrid = document.getElementById('collectionsGrid');
        if (!collectionsGrid) return;

        const categories = await api.getCategories();
        
        let html = '';
        categories.forEach(category => {
            html += `
                <div class="collection-card">
                    <a href="/collections.html?category=${category.id}">
                        <h3>${category.name}</h3>
                        <p>${category.product_count || 0} items</p>
                    </a>
                </div>
            `;
        });

        collectionsGrid.innerHTML = html;
    } catch (error) {
        console.error('Error loading categories:', error);
        collectionsGrid.innerHTML = '<p>Failed to load collections. Please try again.</p>';
    }
}

async function loadFeaturedProducts() {
    try {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        // Fetch all products and filter for featured (or just get first 6)
        const response = await api.getProducts({ limit: 6, featured: true });
        const products = response.products || response;

        let html = '';
        products.forEach(product => {
            html += createProductCard(product);
        });

        productsGrid.innerHTML = html;
    } catch (error) {
        console.error('Error loading featured products:', error);
        productsGrid.innerHTML = '<p>Failed to load products. Please try again.</p>';
    }
}

function createProductCard(product) {
    const stockStatus = product.stock > 0 ? `${product.stock} in stock` : 'Out of stock';
    const cardClass = product.stock === 0 ? 'out-of-stock' : '';
    
    return `
        <a href="/product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
            <div class="product-card">
                <div class="product-image ${cardClass}">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}">` : '<span style="color: #999;">No image</span>'}
                    ${product.stock === 0 ? '<div class="out-of-stock-label">Out of Stock</div>' : ''}
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category || 'Uncategorized'}</p>
                    <h3>${product.name}</h3>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <span class="product-stock">${stockStatus}</span>
                    </div>
                </div>
            </div>
        </a>
    `;
}
