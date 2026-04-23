# NectorNest - Honey Ecommerce

## Project Overview
- **Project Name**: NectorNest
- **Type**: Ecommerce Website (React + Tailwind CSS)
- **Core Functionality**: Sell honey products (500g & 1kg jars) with cart, checkout, admin dashboard
- **Target Users**: Honey buyers, store owner

## Features
- Product catalog with 4 honey varieties
- Shopping cart with localStorage persistence
- Checkout form with order submission
- Admin dashboard (password: `nectar123`)
- Google Sheets integration for products & orders
- Email notifications via EmailJS

## Setup Instructions

### 1. Install Dependencies
```bash
cd nectar-nest
npm install
```

### 2. Development
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## Configuration

### Google Sheets Integration
1. Sign up at [SheetDB](https://sheetdb.io/)
2. Create a sheet with tabs: `products` and `orders`
3. Update `SHEET_DB_URL` in `src/utils/sheets.js`

**Products sheet columns:**
| name | description | price_500g | price_1kg | image | in_stock | category |

**Orders sheet columns:**
| order_id | customer_name | email | phone | address | items | total | status | date |

### Email Notifications
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create email template with variables: to_name, to_email, order_id, items, total, etc.
3. Update these in `src/utils/email.js`:
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `OWNER_EMAIL`

## Routes
- `/` - Home & Shop
- `/cart` - Shopping Cart
- `/checkout` - Checkout Form
- `/order-success` - Order Confirmation
- `/admin` - Orders Dashboard (password: `nectar123`)

## Deployment to Vercel
```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployment.