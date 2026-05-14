# Headless CMS Setup Guide

## Overview
Your React app is now configured to work with WordPress as a Headless CMS. This means:
- Your WordPress site serves as a backend API
- Your React app displays the content
- They can be hosted separately

## Prerequisites
1. **WordPress installation** (self-hosted or on a host)
2. **WooCommerce plugin** (for product management)
3. **Enable REST API** in WordPress
4. **React app hosted** on Vercel, Netlify, or similar

---

## 1. WordPress Setup

### Install Required Plugins
```bash
# You need these plugins in your WordPress installation:
- WooCommerce (for products)
- REST API enabled (usually included in WordPress)
```

### Enable REST API
In WordPress Admin:
1. Go to **Settings → Permalinks**
2. Change to **Post name** (or any non-plain structure)
3. Save changes
4. REST API is now enabled

### Create Products
1. Go to **Products → Add New**
2. Fill in:
   - Product name
   - Description
   - Price
   - Regular price (for discounts)
   - Product image
   - Stock quantity
   - Category

---

## 2. Configure React App

### Local Development
Create `.env.local` file in `apps/web/`:
```env
REACT_APP_WORDPRESS_URL=http://localhost (your WordPress URL)
REACT_APP_ENVIRONMENT=development
```

### Production (Vercel/Netlify)
Add environment variables in your deployment settings:
- `REACT_APP_WORDPRESS_URL`: Your WordPress domain
- `REACT_APP_ENVIRONMENT`: production

---

## 3. API Endpoints Map

### Products
```
GET /wp-json/wp/v2/products
GET /wp-json/wp/v2/products/{id}
```

### Categories
```
GET /wp-json/wp/v2/products/categories
```

### Orders (WooCommerce)
```
POST /wp-json/wc/v3/orders
```

---

## 4. WordPress Security

### CORS Setup (if needed)
Add to WordPress functions.php:
```php
add_filter('rest_pre_serve_request', function($served, $result) {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  return false;
}, 10, 2);
```

### API Authentication
For sensitive operations (orders, user accounts):
1. Enable WooCommerce REST API
2. Generate API keys in WordPress
3. Update WordPressApi.js to include authentication headers

---

## 5. Deployment Steps

### Step 1: Deploy WordPress
- Choose a host (GoDaddy, Bluehost, WP Engine, etc.)
- Install WordPress and WooCommerce
- Add your products
- Test REST API: `https://yoursite.com/wp-json/wp/v2/products`

### Step 2: Deploy React App
On Vercel:
1. Connect your GitHub repo
2. Add environment variable: `REACT_APP_WORDPRESS_URL=https://yoursite.com`
3. Deploy

On Netlify:
1. Connect your GitHub repo
2. Build command: `npm run build --prefix apps/web`
3. Publish directory: `dist/apps/web`
4. Add environment variables
5. Deploy

### Step 3: Test Integration
1. Visit your deployed React app
2. Check if products load
3. Test add to cart
4. Test checkout

---

## 6. Content Management

### Creating Products in WordPress
1. WordPress Admin → Products → Add New
2. Fill all fields
3. Publish
4. Products appear in your React app within minutes

### Updating Prices
- Edit product in WordPress
- Change price
- Save
- React app auto-updates

### Adding Categories
- WordPress Admin → Products → Categories
- Create category
- Assign to products
- Category pages auto-generate

---

## 7. Troubleshooting

### Products not loading?
```javascript
// Check browser console for API URL
console.log(process.env.REACT_APP_WORDPRESS_URL)

// Test API directly
curl https://yoursite.com/wp-json/wp/v2/products
```

### CORS errors?
- Add CORS headers in WordPress
- Or use CORS proxy during development

### WordPress REST API not working?
- Check permalinks settings
- Ensure WooCommerce is activated
- Verify REST API endpoint

---

## Files Changed
- ✅ Created: `src/api/WordPressApi.js` - New API layer
- ✅ Created: `.env.example` - Environment template
- 📝 Update ProductsList.jsx to use WordPressApi instead of EcommerceApi
- 📝 Update other pages similarly

---

## Next Steps
1. Set up WordPress on your host
2. Configure environment variables
3. Update imports in your React components
4. Deploy to Vercel/Netlify
5. Test the integration
