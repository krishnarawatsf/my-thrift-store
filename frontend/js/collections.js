// Collections Page - collections.js
let currentCategory = null;
let allProducts = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Get category from URL params
    const params = new URLSearchParams(window.location.search);
    currentCategory = params.get('category');

    const categoryTitle = document.getElementById('categoryTitle');
    if (categoryTitle && currentCategory) {
        categoryTitle.textContent = capitalizeString(currentCategory);
    }

    // Load products
    await loadProducts();

    // Setup sort handler
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
});

async function loadProducts() {
    try {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        // Build query params
        const params = {};
        if (currentCategory) {
            params.category = currentCategory;
        }

        const response = await api.getProducts(params);
        allProducts = response.products || response;

        renderProducts(allProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.innerHTML = '<p>Failed to load products. Please try again.</p>';
        }
    }
}

function handleSort(event) {
    const sortValue = event.target.value;
    let sorted = [...allProducts];

    switch (sortValue) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
        case 'name-asc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            sorted = [...allProducts];
    }

    renderProducts(sorted);
}

function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (products.length === 0) {
        productsGrid.innerHTML = '<p>No products found in this category.</p>';
        return;
    }

    let html = '';
    products.forEach(product => {
        const stockStatus = product.stock > 0 ? `${product.stock} in stock` : 'Out of stock';
        const cardClass = product.stock === 0 ? 'out-of-stock' : '';
        
        html += `
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
    });

    productsGrid.innerHTML = html;
}

function capitalizeString(str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
