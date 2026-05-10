import { useState, useEffect } from 'react';
import { products as mockProducts } from '../data/products';

/**
 * useProducts — fetches products.
 * Currently returns mock data. When Supabase is configured,
 * swap the mock block for the commented-out Supabase fetch.
 */
export const useProducts = ({ category = null, featured = false } = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // ── Mock data (active) ──────────────────────────────────────────
        let data = [...mockProducts];
        if (featured) data = data.filter((p) => p.is_featured);
        if (category) data = data.filter((p) => p.category.toLowerCase() === category.toLowerCase());
        setProducts(data);

        // ── Supabase (uncomment when credentials are ready) ─────────────
        // import { supabase } from '../lib/supabase';
        // let query = supabase.from('products').select('*');
        // if (featured) query = query.eq('is_featured', true);
        // if (category) query = query.eq('category', category);
        // const { data, error } = await query;
        // if (error) throw error;
        // setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, featured]);

  return { products, loading, error };
};

/**
 * useProduct — fetch a single product by id.
 */
export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const found = mockProducts.find((p) => p.id === id);
    setProduct(found || null);
    setLoading(false);
  }, [id]);

  return { product, loading, error };
};
