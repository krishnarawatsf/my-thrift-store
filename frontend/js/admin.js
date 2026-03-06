// Admin Dashboard - admin.js
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    await loadCategories();
    setupFormHandlers();
});

// ==================== Tab Switching ====================
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Deactivate all buttons
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName)?.classList.add('active');

    // Activate button
    event.target?.classList.add('active');
}

// ==================== Products Management ====================
let allProducts = [];

async function loadProducts() {
    try {
        const response = await api.getProducts();
        allProducts = response.length ? response : response.products || [];
        renderProductsTable();
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products');
    }
}

function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    if (allProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">No products yet</td></tr>';
        return;
    }

    let html = '';
    allProducts.forEach(product => {
        html += `
            <tr>
                <td>${product.name}</td>
                <td>${product.category || 'N/A'}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="action-btn btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function setupFormHandlers() {
    // Product form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(productForm);
            const sizes = formData.get('sizes')
                ? formData.get('sizes').split(',').map(s => s.trim())
                : [];

            const productData = {
                name: formData.get('name'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price')),
                image: formData.get('image'),
                category: formData.get('category'),
                sizes: sizes,
                stock: parseInt(formData.get('stock'))
            };

            try {
                await api.createProduct(productData);
                alert('Product added successfully!');
                productForm.reset();
                await loadProducts();
            } catch (error) {
                console.error('Error creating product:', error);
                alert('Failed to add product');
            }
        });
    }

    // Category form
    const categoryForm = document.getElementById('categoryForm');
    if (categoryForm) {
        categoryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(categoryForm);
            const categoryData = {
                name: formData.get('name'),
                description: formData.get('description')
            };

            try {
                await api.createCategory(categoryData);
                alert('Category added successfully!');
                categoryForm.reset();
                await loadCategories();
            } catch (error) {
                console.error('Error creating category:', error);
                alert('Failed to add category');
            }
        });
    }
}

async function editProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('editProductModal');
    const form = document.getElementById('editProductForm');

    document.getElementById('editProductId').value = productId;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductCategory').value = product.category;

    form.style.display = 'block';
    modal.classList.add('open');

    // Remove old listener
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Add new listener
    newForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const productData = {
            name: document.getElementById('editProductName').value,
            category: document.getElementById('editProductCategory').value
        };

        try {
            await api.updateProduct(productId, productData);
            alert('Product updated successfully!');
            closeModal('editProductModal');
            await loadProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    });
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        await api.deleteProduct(productId);
        alert('Product deleted successfully!');
        await loadProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
    }
}

// ==================== Categories Management ====================
let allCategories = [];

async function loadCategories() {
    try {
        allCategories = await api.getCategories();
        renderCategoriesTable();
    } catch (error) {
        console.error('Error loading categories:', error);
        alert('Failed to load categories');
    }
}

function renderCategoriesTable() {
    const tbody = document.getElementById('categoriesTableBody');
    if (!tbody) return;

    if (allCategories.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #999;">No categories yet</td></tr>';
        return;
    }

    let html = '';
    allCategories.forEach(category => {
        html += `
            <tr>
                <td>${category.name}</td>
                <td>${category.description || '-'}</td>
                <td>${category.product_count || 0}</td>
                <td>
                    <button class="action-btn btn-delete" onclick="deleteCategory('${category.id}')">Delete</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

async function deleteCategory(categoryId) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
        await api.deleteCategory(categoryId);
        alert('Category deleted successfully!');
        await loadCategories();
    } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
    }
}

// ==================== Modal Management ====================
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
    }
}

// Close modal when clicking overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('open');
    }
});
