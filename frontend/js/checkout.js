// Checkout Page - checkout.js
document.addEventListener('DOMContentLoaded', () => {
    renderOrderSummary();
    setupFormHandlers();

    if (cart.isEmpty()) {
        alert('Your cart is empty. Redirecting to home...');
        window.location.href = '/';
    }
});

function renderOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    if (!summaryItems) return;

    let html = '';
    cart.items.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        html += `
            <div class="summary-item">
                <div class="summary-item-name">
                    <p>${item.name}</p>
                    <div class="summary-item-size">Size: ${item.size}</div>
                    <div>Qty: ${item.quantity}</div>
                </div>
                <div class="summary-item-price">$${itemTotal}</div>
            </div>
        `;
    });

    summaryItems.innerHTML = html;

    const subtotal = cart.getSubtotal();
    const tax = subtotal * TAX_RATE;
    const shipping = 5.99; // Default standard shipping
    const total = subtotal + tax + shipping;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function setupFormHandlers() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(checkoutForm);
        const orderData = {
            customer: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            },
            shipping: {
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zipcode: formData.get('zipcode')
            },
            payment: {
                cardName: formData.get('cardName'),
                cardNumber: formData.get('cardNumber'),
                expiry: formData.get('expiry'),
                cvv: formData.get('cvv')
            },
            items: cart.items.map(item => ({
                productId: item.id,
                name: item.name,
                size: item.size,
                quantity: item.quantity,
                price: item.price
            })),
            subtotal: cart.getSubtotal(),
            tax: cart.getSubtotal() * TAX_RATE,
            shipping: 5.99,
            total: cart.getSubtotal() + (cart.getSubtotal() * TAX_RATE) + 5.99
        };

        try {
            // Show loading state
            const submitBtn = checkoutForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            // Create order via API
            const response = await api.createOrder(orderData);
            const orderId = response.id || response.order_id;

            // Clear cart
            cart.clear();

            // Redirect to confirmation
            window.location.href = `/order-confirmation.html?id=${orderId}`;
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
            
            const submitBtn = checkoutForm.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}
