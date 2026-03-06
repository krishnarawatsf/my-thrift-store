-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  phone TEXT,
  email TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cart sessions (optional, for tracked carts)
CREATE TABLE IF NOT EXISTS cart_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT UNIQUE,
  items JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_sessions ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);

-- Insert sample categories
INSERT INTO categories (name, slug, image_url) VALUES
  ('Jackets', 'jackets', 'https://via.placeholder.com/300'),
  ('Jerseys', 'jerseys', 'https://via.placeholder.com/300'),
  ('Shirts', 'shirts', 'https://via.placeholder.com/300'),
  ('Caps', 'caps', 'https://via.placeholder.com/300'),
  ('Bottoms', 'bottoms', 'https://via.placeholder.com/300'),
  ('Accessories', 'accessories', 'https://via.placeholder.com/300')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, category, images, sizes, stock) VALUES
  (
    'Vintage Denim Jacket',
    'Classic vintage denim jacket in perfect condition. Great for any streetwear outfit.',
    2500,
    'jackets',
    ARRAY['https://via.placeholder.com/500'],
    ARRAY['XS', 'S', 'M', 'L', 'XL'],
    12
  ),
  (
    'Retro Band Jersey',
    'Original 90s band jersey in excellent condition.',
    1800,
    'jerseys',
    ARRAY['https://via.placeholder.com/500'],
    ARRAY['S', 'M', 'L', 'XL'],
    8
  ),
  (
    'Oversized Plain Tee',
    'Premium oversized blank t-shirt, perfect base for any look.',
    800,
    'shirts',
    ARRAY['https://via.placeholder.com/500'],
    ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    25
  ),
  (
    'Vintage Snapback Cap',
    'Classic 90s snapback cap with embroidered logo.',
    600,
    'caps',
    ARRAY['https://via.placeholder.com/500'],
    ARRAY['One Size'],
    15
  ),
  (
    'Cargo Pants',
    'Authentic vintage cargo pants with multiple pockets.',
    2000,
    'bottoms',
    ARRAY['https://via.placeholder.com/500'],
    ARRAY['28', '30', '32', '34', '36'],
    10
  ),
  (
    'Silver Chain Necklace',
    'Authentic silver chain necklace, vintage piece.',
    1200,
    'accessories',
    ARRAY['https://via.placeholder.com/500'],
    ARRAY['One Size'],
    20
  );

-- Create indexes for better query performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
