/**
 * WordPress Headless CMS API
 * Configure this with your WordPress REST API endpoint
 */

const WORDPRESS_API_URL = import.meta.env.REACT_APP_WORDPRESS_URL || "https://your-wordpress-site.com";
const WP_API_NAMESPACE = "/wp-json/wp/v2";

/**
 * Fetch products from WordPress (WooCommerce)
 */
export async function getProducts(params = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.limit) queryParams.append("per_page", params.limit);
    if (params.offset) queryParams.append("offset", params.offset);
    if (params.category_id) queryParams.append("product_cat", params.category_id);
    if (params.search) queryParams.append("search", params.search);
    
    const url = `${WORDPRESS_API_URL}${WP_API_NAMESPACE}/products?${queryParams.toString()}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const products = await response.json();
    
    return {
      products: products.map(transformWPProduct),
      total: parseInt(response.headers.get('X-WP-Total') || 0)
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch single product from WordPress
 */
export async function getProduct(id) {
  try {
    const url = `${WORDPRESS_API_URL}${WP_API_NAMESPACE}/products/${id}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const product = await response.json();
    return transformWPProduct(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

/**
 * Fetch product categories
 */
export async function getCategories() {
  try {
    const url = `${WORDPRESS_API_URL}${WP_API_NAMESPACE}/products/categories?per_page=100`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const categories = await response.json();
    return {
      categories: categories.map(cat => ({
        id: cat.id,
        title: cat.name,
        description: cat.description,
        image: cat.image?.src,
      }))
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Create order in WordPress (WooCommerce)
 */
export async function createOrder(orderData) {
  try {
    const url = `${WORDPRESS_API_URL}${WP_API_NAMESPACE}/orders`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const order = await response.json();
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * Transform WordPress product to your app format
 */
function transformWPProduct(wpProduct) {
  return {
    id: wpProduct.id,
    title: wpProduct.name,
    description: wpProduct.short_description || wpProduct.description,
    subtitle: wpProduct.short_description,
    price: parseFloat(wpProduct.price) || 0,
    originalPrice: parseFloat(wpProduct.regular_price) || null,
    image: wpProduct.images?.[0]?.src || null,
    mainImage: wpProduct.images?.[0]?.src || null,
    images: wpProduct.images?.map(img => ({
      url: img.src,
      order: img.position,
      type: 'product'
    })) || [],
    ribbon_text: wpProduct.on_sale ? 'Sale' : null,
    stock: wpProduct.stock_quantity || 0,
    sku: wpProduct.sku,
    categories: wpProduct.categories?.map(cat => ({
      id: cat.id,
      name: cat.name,
    })) || [],
    attributes: wpProduct.attributes || [],
    variants: [
      {
        id: wpProduct.id,
        title: wpProduct.name,
        price_in_cents: Math.round(parseFloat(wpProduct.price) * 100),
        price_formatted: `${wpProduct.price} SAR`,
        sale_price_in_cents: wpProduct.on_sale ? Math.round(parseFloat(wpProduct.sale_price) * 100) : null,
        sale_price_formatted: wpProduct.on_sale ? `${wpProduct.sale_price} SAR` : null,
        image_url: wpProduct.images?.[0]?.src || null,
        sku: wpProduct.sku,
        inventory_quantity: wpProduct.stock_quantity || 0,
      }
    ]
  };
}
