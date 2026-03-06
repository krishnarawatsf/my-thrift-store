// Product Detail Page - product.js
let currentProductId = null;
let currentProduct = null;
let selectedSize = null;
let selectedQuantity = 1;

document.addEventListener('DOMContentLoaded', async () => {
    // Get product ID from URL params
    const params = new URLSearchParams(window.location.search);
    currentProductId = params.get('id');

    if (!currentProductId) {
        window.location.href = '/';
        return;
    }

    await loadProduct();
    setupEventListeners();
});

async function loadProduct() {
    try {
        currentProduct = await api.getProduct(currentProductId);
        renderProduct(currentProduct);
    } catch (error) {
        console.error('Error loading product:', error);
        alert('Product not found. Redirecting...');
        window.location.href = '/';
    }
}

function renderProduct(product) {
    // Update page title
    document.title = product.name + ' - ThriftStore';

    // Main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.innerHTML = product.image 
            ? `<img src="${product.image}" alt="${product.name}">`
            : '<span style="color: #999;">No image available</span>';
    }

    // Thumbnails (simulate with main image for now)
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    if (thumbnailGallery && product.image) {
        thumbnailGallery.innerHTML = `
            <div class="thumbnail active">
                <img src="${product.image}" alt="thumbnail" onclick="document.getElementById('mainImage').innerHTML = '<img src="${product.image}" alt=\"${product.name}\">'">
            </div>
        `;
    }

    // Product info
    document.querySelector('.product-info h1').textContent = product.name;
    document.querySelector('.product-info .product-price').textContent = `$${product.price.toFixed(2)}`;
    document.querySelector('.product-category').textContent = product.category || 'Uncategorized';
    document.querySelector('.product-description').textContent = product.description || 'No description available.';

    // Stock info
    const stockInfo = document.querySelector('.stock-info');
    if (stockInfo) {
        if (product.stock > 0) {
            stockInfo.innerHTML = `✓ ${product.stock} in stock`;
            stockInfo.style.color = '#28a745';
        } else {
            stockInfo.innerHTML = '✗ Out of stock';
            stockInfo.style.color = '#e74c3c';
        }
    }

    // Sizes
    const sizesContainer = document.getElementById('sizesContainer');
    if (sizesContainer && product.sizes) {
        let sizesHtml = '';
        const sizes = Array.isArray(product.sizes) ? product.sizes : Object.keys(product.sizes || {});
        
        sizes.forEach(size => {
            sizesHtml += `
                <button class="size-btn" onclick="selectSize('${size}')">${size}</button>
            `;
        });
        
        sizesContainer.innerHTML = sizesHtml;
    }

    // Quantity
    selectedQuantity = 1;
    document.getElementById('quantityInput').value = 1;
}

function setupEventListeners() {
    // Quantity controls
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantityInput');
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (selectedQuantity > 1) {
                selectedQuantity--;
                quantityInput.value = selectedQuantity;
            }
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            selectedQuantity++;
            quantityInput.value = selectedQuantity;
        });
    }

    if (quantityInput) {
        quantityInput.addEventListener('change', (e) => {
            const val = parseInt(e.target.value) || 1;
            selectedQuantity = Math.max(1, val);
            quantityInput.value = selectedQuantity;
        });
    }

    // Add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }
}

function selectSize(size) {
    selectedSize = size;
    
    // Update button styles
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === size) {
            btn.classList.add('active');
        }
    });
}

function addToCart() {
    if (!selectedSize) {
        alert('Please select a size before adding to cart.');
        return;
    }

    if (!currentProduct) {
        alert('Product information not loaded. Please try again.');
        return;
    }

    cart.add(currentProduct, selectedSize, selectedQuantity);
    
    // Show feedback
    const addBtn = document.getElementById('addToCartBtn');
    const originalText = addBtn.textContent;
    addBtn.textContent = '✓ Added to cart!';
    
    setTimeout(() => {
        addBtn.textContent = originalText;
    }, 2000);

    openCartDrawer();
}
