// Cart Management - LocalStorage based cart system
class Cart {
    constructor(storageKey = 'thriftstore_cart') {
        this.storageKey = storageKey;
        this.items = this.load();
    }

    // Load cart from LocalStorage
    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    // Save cart to LocalStorage
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            this.notifyListeners();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Add item to cart
    add(product, size, quantity = 1) {
        const existingItem = this.items.find(
            item => item.id === product.id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size,
                quantity
            });
        }

        this.save();
    }

    // Remove item from cart
    remove(productId, size) {
        const index = this.items.findIndex(
            item => item.id === productId && item.size === size
        );

        if (index > -1) {
            this.items.splice(index, 1);
            this.save();
        }
    }

    // Update item quantity
    updateQuantity(productId, size, quantity) {
        const item = this.items.find(
            item => item.id === productId && item.size === size
        );

        if (item) {
            if (quantity <= 0) {
                this.remove(productId, size);
            } else {
                item.quantity = quantity;
                this.save();
            }
        }
    }

    // Clear entire cart
    clear() {
        this.items = [];
        this.save();
    }

    // Get cart count
    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Get cart subtotal
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Get empty status
    isEmpty() {
        return this.items.length === 0;
    }

    // Subscribe to changes
    onChange(callback) {
        this.listeners = this.listeners || [];
        this.listeners.push(callback);
    }

    // Notify listeners of changes
    notifyListeners() {
        if (this.listeners) {
            this.listeners.forEach(callback => callback(this));
        }
    }
}

// Create global cart instance
const cart = new Cart();

// Update cart UI helpers
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = cart.getCount();
    
    cartCountElements.forEach(el => {
        if (count > 0) {
            el.textContent = count;
            el.style.display = 'inline-flex';
        } else {
            el.style.display = 'none';
        }
    });
}

function renderCartDrawer() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;

    if (cart.isEmpty()) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <p>Start shopping to add items!</p>
            </div>
        `;
        return;
    }

    let html = '<div class="cart-items">';
    
    cart.items.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-item-image">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : 'No image'}
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size">Size: ${item.size}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button onclick="decreaseCartItem('${item.id}', '${item.size}')">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseCartItem('${item.id}', '${item.size}')">+</button>
                    </div>
                    <a href="#" onclick="removeCartItem('${item.id}', '${item.size}'); return false;" class="cart-item-remove">Remove</a>
                </div>
            </div>
        `;
    });

    html += '</div>';

    const subtotal = cart.getSubtotal();
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    html += `
        <div class="cart-summary">
            <div class="summary-line">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-line">
                <span>Tax:</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-line total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="cart-actions">
                <a href="/checkout.html" class="btn btn-primary cart-checkout">Proceed to Checkout</a>
                <button onclick="closeCartDrawer()" class="btn cart-continue">Continue Shopping</button>
            </div>
        </div>
    `;

    cartContent.innerHTML = html;
}

// Cart drawer functions
function openCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('open');
        renderCartDrawer();
    }
}

function closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
    }
}

function increaseCartItem(productId, size) {
    const item = cart.items.find(i => i.id === productId && i.size === size);
    if (item) {
        cart.updateQuantity(productId, size, item.quantity + 1);
        renderCartDrawer();
        updateCartCount();
    }
}

function decreaseCartItem(productId, size) {
    const item = cart.items.find(i => i.id === productId && i.size === size);
    if (item && item.quantity > 1) {
        cart.updateQuantity(productId, size, item.quantity - 1);
        renderCartDrawer();
        updateCartCount();
    }
}

function removeCartItem(productId, size) {
    cart.remove(productId, size);
    renderCartDrawer();
    updateCartCount();
}

// Initialize cart listeners
cart.onChange(() => {
    updateCartCount();
    renderCartDrawer();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Cart toggle button
    const cartToggle = document.getElementById('cartToggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', openCartDrawer);
    }

    // Cart overlay click to close
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartDrawer);
    }

    // Close cart button
    const closeCartBtn = document.getElementById('closeCart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCartDrawer);
    }
});
