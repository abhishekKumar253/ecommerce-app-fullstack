<h1 align="center">E-Shop Mart 🛒</h1>

## About This Project:

**E-Shop Mart** is a full-stack e-commerce platform built with cutting-edge technologies to provide an optimal shopping experience. The project includes the following features:

- 🗄️ **MongoDB & Redis Integration**: Efficient data storage and caching.
- 💳 **Razorpay Payment Setup**: Secure payments using Razorpay.
- 🔐 **Robust Authentication System**: User authentication with JWT (Access & Refresh Tokens).
- 📝 **User Signup & Login**: Create accounts and securely log in.
- 🛒 **E-Commerce Core**: Basic e-commerce functionalities like product listing, shopping cart, and checkout.
- 📦 **Product & Category Management**: Admin dashboard to manage products and categories.
- 🛍️ **Shopping Cart Functionality**: Add/remove items, view the cart total.
- 💰 **Checkout with Razorpay**: Secure and smooth checkout process with Razorpay.
- 🏷️ **Coupon Code System**: Add discounts using coupon codes.
- 👑 **Admin Dashboard**: Admin interface for managing users, products, orders, etc.
- 📊 **Sales Analytics**: Track sales data and generate reports using **Recharts**.
- 🎨 **Design with Tailwind CSS**: A beautiful UI that’s mobile-responsive.
- 🔒 **Security**: Secure user data and transactions.
- 🚀 **Caching with Redis**: Optimized caching for faster responses.
- 🏃‍♂️ **State Management with Zustand**: Efficient global state management.
- 🎞️ **Animations with Framer Motion**: Smooth animations for better UX.

## Tech Stack:

- **Frontend**: React.js, Tailwind CSS, Zustand, Framer Motion, Recharts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Razorpay
- **Authentication**: JWT (Refresh & Access Tokens)
- **Caching**: Redis
- **Cloud Storage**: Cloudinary for image uploads
- **Charts**: Recharts for analytics and visualizing sales data

## Setup the Environment:

Make sure to set up the `.env` file in the root directory as follows:

```bash
PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key

NODE_ENV=development

```shell
npm run build
```

```shell
npm run start
```

