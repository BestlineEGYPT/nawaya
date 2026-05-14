# Nawaya Pro - WordPress Headless CMS Integration

## Quick Start

Your React application is now fully configured to work with WordPress as a Headless CMS backend.

### What Changed?
- ✅ Replaced Ecommerce API with WordPress REST API
- ✅ All imports updated to use `WordPressApi`
- ✅ Product fetching, ordering, and categories use WordPress
- ✅ Currency formatting simplified for SAR
- ✅ Environment configuration ready

---

## Step 1: Local Development Setup

### 1.1 Create `.env.local` in `apps/web/`
```env
REACT_APP_WORDPRESS_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
```

Replace `http://localhost:8000` with your WordPress development URL.

### 1.2 Start Development Server
```bash
npm run dev
# Server runs on http://localhost:3001
```

---

## Step 2: WordPress Setup

### 2.1 Install WordPress & WooCommerce

**Option A: Local (for testing)**
```bash
# Using LocalWP or similar
1. Download LocalWP from https://localwp.com
2. Create new WordPress site
3. Install WooCommerce plugin via WordPress admin
```

**Option B: Production Hosting**
- GoDaddy, Bluehost, WP Engine, DigitalOcean, etc.
- Install WordPress and WooCommerce during setup

### 2.2 Enable REST API
```
WordPress Admin → Settings → Permalinks
Change to: "Post name" or any non-plain structure
Save Changes
```

### 2.3 Create Products
```
WordPress Admin → Products → Add New
- Title
- Description
- Price
- Regular Price (if on sale)
- Product Image
- Stock Quantity
- Category
- Publish
```

### 2.4 Create Categories (Optional)
```
WordPress Admin → Products → Categories
- Create categories
- Assign to products
```

---

## Step 3: Test WordPress API

### 3.1 Test Products Endpoint
```bash
# Should return JSON list of products
curl https://yoursite.com/wp-json/wp/v2/products

# Should return single product
curl https://yoursite.com/wp-json/wp/v2/products/123
```

### 3.2 Test Categories Endpoint
```bash
curl https://yoursite.com/wp-json/wp/v2/products/categories
```

If you get CORS errors in browser, add to WordPress `functions.php`:
```php
add_filter('rest_pre_serve_request', function($served, $result) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    return false;
}, 10, 2);
```

---

## Step 4: Configure Order Processing

### 4.1 WordPress Order API
Orders are created via: `/wp-json/wp/v2/orders`

In ShoppingCart.jsx, orders are created with:
```javascript
{
  line_items: [{product_id, quantity}],
  billing: {email, first_name, last_name},
  status: 'pending'
}
```

### 4.2 Payment Setup (Recommended)
- Install: WooCommerce Payments, Stripe, PayPal
- Configure in WordPress
- Add webhook handling for payment confirmation

---

## Step 5: Deployment

### 5.1 Deploy WordPress
```
1. Choose hosting (GoDaddy, WP Engine, DigitalOcean)
2. Install WordPress
3. Install WooCommerce
4. Add your products
5. Note your WordPress URL (e.g., https://nawaya-pro.com)
```

### 5.2 Deploy React App - Option A: Vercel

```bash
# 1. Push code to GitHub
git add .
git commit -m "WordPress integration"
git push origin main

# 2. Connect to Vercel
# Go to vercel.com → Import Project → Select your repo

# 3. Add Environment Variables
REACT_APP_WORDPRESS_URL=https://nawaya-pro.com
REACT_APP_ENVIRONMENT=production

# 4. Deploy
```

### 5.2 Deploy React App - Option B: Netlify

```bash
# 1. Push to GitHub/GitLab

# 2. Connect Netlify
# Go to netlify.com → New Site → Connect to Git

# 3. Build Settings
Build command:   npm run build --prefix apps/web
Publish dir:     dist/apps/web

# 4. Environment Variables
REACT_APP_WORDPRESS_URL=https://nawaya-pro.com
REACT_APP_ENVIRONMENT=production

# 5. Deploy
```

### 5.3 Deploy React App - Option C: Self-hosted

```bash
# 1. Build
npm run build --prefix apps/web

# 2. Deploy to server
scp -r dist/apps/web/* user@server:/var/www/nawaya-pro/

# 3. Configure web server (nginx)
server {
    listen 80;
    server_name nawaya-pro.com;
    
    root /var/www/nawaya-pro;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
}
```

---

## API Reference

### Products
```javascript
// Get all products
GET /wp-json/wp/v2/products
// Query params: per_page=20, offset=0, product_cat=123, search=term

// Get single product
GET /wp-json/wp/v2/products/123
```

### Categories
```javascript
GET /wp-json/wp/v2/products/categories
```

### Orders
```javascript
POST /wp-json/wp/v2/orders
Body: {
  line_items: [{product_id, quantity}],
  billing: {email, first_name, last_name},
  status: 'pending'
}
```

---

## Troubleshooting

### Products not loading?

**Check 1: WordPress REST API enabled**
```bash
curl https://yoursite.com/wp-json/wp/v2/products
# Should return valid JSON, not 404 or error
```

**Check 2: Environment variable set**
```bash
# In apps/web/.env.local
REACT_APP_WORDPRESS_URL=https://yoursite.com
```

**Check 3: Browser console errors**
- Open browser DevTools → Console
- Look for fetch errors
- Verify URL is correct

### CORS errors?

**Solution 1: Add CORS headers**
```php
// In WordPress functions.php
add_filter('rest_pre_serve_request', function($served, $result) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    return false;
}, 10, 2);
```

**Solution 2: Use CORS proxy (development only)**
```
REACT_APP_WORDPRESS_URL=https://cors-anywhere.herokuapp.com/https://yoursite.com
```

### Categories not showing?

1. In WordPress, create categories:
   - Products → Categories
   - Add names (Screen Protectors, Cases, etc.)

2. Assign categories to products:
   - Edit product
   - Select category in sidebar
   - Save

3. Test in browser:
   ```
   https://yoursite.com/wp-json/wp/v2/products/categories
   ```

---

## File Changes Summary

### Updated Files
- ✅ `src/components/ProductsList.jsx` - Uses `WordPressApi.getProducts`
- ✅ `src/pages/ScreenProtectorsPage.jsx` - Uses `WordPressApi.getCategories`
- ✅ `src/pages/CameraLensesPage.jsx` - Uses `WordPressApi.getCategories`
- ✅ `src/pages/CasesPage.jsx` - Uses `WordPressApi.getCategories`
- ✅ `src/pages/ChargersCablesPage.jsx` - Uses `WordPressApi.getCategories`
- ✅ `src/pages/PowerBankPage.jsx` - Uses `WordPressApi.getCategories`
- ✅ `src/pages/ProductDetailPage.jsx` - Uses `WordPressApi.getProduct`
- ✅ `src/pages/BestSellingPage.jsx` - Uses `WordPressApi` (new)
- ✅ `src/components/ShoppingCart.jsx` - Uses `WordPressApi.createOrder`
- ✅ `src/hooks/useCart.jsx` - Updated currency formatter
- ✅ `src/App.jsx` - Added `/best-selling` route

### New Files
- ✅ `src/api/WordPressApi.js` - WordPress REST API layer
- ✅ `.env.local` - Development environment variables
- ✅ `.env.example` - Environment template
- ✅ `WORDPRESS_SETUP.md` - This file

---

## Next Steps

1. ✅ Set up WordPress with WooCommerce
2. ✅ Create products and categories in WordPress
3. ✅ Configure environment variables
4. ✅ Test locally
5. ✅ Deploy WordPress
6. ✅ Deploy React app
7. ✅ Test production integration

---

## Support

For WordPress REST API documentation:
- https://developer.wordpress.org/rest-api/
- https://developer.wordpress.org/rest-api/reference/products/
- https://woocommerce.com/document/woocommerce-rest-api/

For React deployment:
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

For issues:
- Check browser console for errors
- Verify WordPress endpoints with curl
- Ensure environment variables are set
