# 🍔 FoodHub Frontend

This is the frontend of the FoodHub food delivery web application. It provides a smooth and interactive UI for users, providers, and admins.

---

## 🚀 Features

### 🏠 User Side

- Home page with featured meals
- Authentication (Sign up / Login)
- Browse meals with filters
- View meal details
- Add to cart with toast notifications
- Place orders (Cash on Delivery / Stripe Payment)
- Order history tracking

### 🧑‍🍳 Provider Dashboard

- Kitchen profile management
- Menu management (Add/Edit/Delete meals)
- Live order tracking
- Update order status

### 🛠️ Admin Dashboard

- User management (ban/unban)
- Category management
- View all orders

---

## ⚛️ Tech Stack

- React.js
- React Router
- Context API / State Management
- Tailwind CSS / CSS Framework
- Axios
- Stripe (Frontend integration)

---

## 📁 Project Structure

```
src/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── context/
└── App.jsx
```

### 🔍 Modular Pattern

Frontend follows a **component-based modular architecture**.

#### Benefits:
- Reusable components
- Clean UI structure
- Easy to scale
- Better maintainability

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone <your-frontend-repo-link>
cd frontend
```
### 2️⃣ Install dependencies
```
npm install
```
###  3️⃣ Setup environment variables

Create a .env file:
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_public_key
```
### 4️⃣ Run the project
```
npm run dev
```
### 🌐 Application URL
```
http://localhost:5173
```
### 🎯 Key Functionalities
Authentication UI
Meal browsing & filtering
Cart system
Order system
Payment integration
Role-based dashboards
### ✅ Future Improvements
Mobile responsiveness improvements
Dark mode
Real-time updates
### 👨‍💻 Author

Developed by Jawad Ibrahim Shopnil