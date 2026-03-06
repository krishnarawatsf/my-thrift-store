'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  sizes: string[]
  stock: number
  images: string[]
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 0,
    images: [],
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*'),
      ])

      if (productsRes.data) setProducts(productsRes.data)
      if (categoriesRes.data) setCategories(categoriesRes.data)
    } catch (err) {
      console.error('Error fetching:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stock' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.category) {
      alert('Please fill in all required fields')
      return
    }

    try {
      if (editingId) {
        // Update
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        setEditingId(null)
      } else {
        // Create
        const { error } = await supabase
          .from('products')
          .insert([formData])

        if (error) throw error
      }

      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 0,
        images: [],
      })
      setShowModal(false)
      fetchData()
    } catch (err) {
      console.error('Error:', err)
      alert('Error saving product')
    }
  }

  const handleEdit = (product: Product) => {
    setFormData(product)
    setEditingId(product.id)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      fetchData()
    } catch (err) {
      console.error('Error:', err)
      alert('Error deleting product')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      stock: 0,
      images: [],
    })
  }

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">Loading...</div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800"
        >
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Category</th>
              <th className="px-6 py-3 text-left font-semibold">Price</th>
              <th className="px-6 py-3 text-left font-semibold">Stock</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No products yet. Click "Add Product" to get started!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">{product.category}</td>
                  <td className="px-6 py-4 font-semibold">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded text-sm ${
                        product.stock > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2"
                  placeholder="e.g., Vintage Denim Jacket"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded px-4 py-2"
                  placeholder="Describe the product..."
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-4 py-2"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-4 py-2"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Stock & Images */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock || ''}
                    onChange={handleChange}
                    className="w-full border rounded px-4 py-2"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Image URLs (comma separated)
                  </label>
                  <input
                    type="text"
                    value={(formData.images || []).join(', ')}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        images: e.target.value
                          .split(',')
                          .map((url) => url.trim())
                          .filter((url) => url),
                      }))
                    }
                    className="w-full border rounded px-4 py-2"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-semibold mb-2">Sizes</label>
                <input
                  type="text"
                  value={(formData.sizes || []).join(', ')}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sizes: e.target.value
                        .split(',')
                        .map((size) => size.trim().toUpperCase())
                        .filter((size) => size),
                    }))
                  }
                  className="w-full border rounded px-4 py-2"
                  placeholder="XS, S, M, L, XL"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate sizes with commas
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2 rounded font-semibold hover:bg-gray-800"
                >
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
