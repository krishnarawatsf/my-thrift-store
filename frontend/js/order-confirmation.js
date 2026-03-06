// Order Confirmation Page - order-confirmation.js
let currentOrderId = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Get order ID from URL params
    const params = new URLSearchParams(window.location.search);
    currentOrderId = params.get('id');

    if (!currentOrderId) {
        window.location.href = '/';
        return;
    }

    await loadOrderDetails();
});

async function loadOrderDetails() {
    try {
        const order = await api.getOrder(currentOrderId);
        renderOrderConfirmation(order);
    } catch (error) {
        console.error('Error loading order:', error);
        alert('Order not found.');
        window.location.href = '/';
    }
}

function renderOrderConfirmation(order) {
    // Order number
    const orderNumber = document.getElementById('orderNumber');
    if (orderNumber) {
        orderNumber.textContent = order.id || order.order_number || currentOrderId;
    }

    // Order date
    const orderDate = document.getElementById('orderDate');
    if (orderDate) {
        const date = new Date(order.created_at || Date.now());
        orderDate.textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Order status
    const orderStatus = document.getElementById('orderStatus');
    if (orderStatus) {
        orderStatus.textContent = order.status || 'Processing';
        orderStatus.className = `order-status status-${order.status || 'processing'}`;
    }

    // Order total
    const orderTotal = document.getElementById('orderTotal');
    if (orderTotal) {
        orderTotal.textContent = `$${(order.total || 0).toFixed(2)}`;
    }

    // Order items
    const itemsList = document.getElementById('itemsList');
    if (itemsList) {
        let html = '';
        const items = order.items || [];
        
        items.forEach(item => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            html += `
                <div class="order-item">
                    <div class="order-item-details">
                        <p><strong>${item.name}</strong></p>
                        <p>Size: ${item.size}</p>
                        <p>Quantity: ${item.quantity} × $${item.price.toFixed(2)}</p>
                    </div>
                    <div style="text-align: right;">
                        <strong>$${itemTotal}</strong>
                    </div>
                </div>
            `;
        });
        
        itemsList.innerHTML = html;
    }

    // Shipping info
    const shippingInfo = document.querySelector('.shipping-info');
    if (shippingInfo && order.shipping) {
        const shipping = order.shipping;
        const address = document.querySelector('.shipping-info');
        if (address) {
            address.innerHTML = `
                <h2>Shipping Address</h2>
                <p>
                    ${order.customer?.firstName} ${order.customer?.lastName}<br>
                    ${shipping.address}<br>
                    ${shipping.city}, ${shipping.state} ${shipping.zipcode}
                </p>
                <p style="margin-top: 1rem;">
                    Email: ${order.customer?.email}<br>
                    Phone: ${order.customer?.phone}
                </p>
            `;
        }
    }
}
