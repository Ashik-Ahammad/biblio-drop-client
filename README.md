<div align="center">

# 📚 BiblioDrop – Online Book Delivery Management System

[![Live Preview](https://img.shields.io/badge/Live_Preview-Visit_Now-000000?style=for-the-badge&logo=vercel)](https://bibliodrop-elibrary.vercel.app/)

[![Live Preview](https://img.shields.io/badge/Live_Preview-Visit_Now-000000?style=for-the-badge&logo=vercel)](https://bibliodrop-elibrary.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-1666FF?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![HeroUI](https://img.shields.io/badge/HeroUI-006FEE?style=for-the-badge)](https://heroui.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-171717?style=for-the-badge)](https://better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)](https://stripe.com/)

**Fast, reliable, and seamless online book delivery and library management.**

</div>

---

## 📖 Project Overview

**BiblioDrop** is a comprehensive digital platform bridging the gap between avid readers, local libraries, and independent book owners. Traditional library systems require physical visits, which can be a barrier for busy professionals or remote students. BiblioDrop democratizes access to books by enabling users to browse collections, request doorstep delivery, and manage their reading lists securely.

Librarians and book owners can seamlessly list their inventory, while an Admin oversees the entire ecosystem. The platform ensures a secure, streamlined borrowing experience with role-based access control, secure payment integration, and interactive features like verified reviews.

---

## ✨ Key Features

### 👤 For Users (Readers)
- **Browse & Filter:** Explore a wide variety of books with advanced search, category filters, and price ranges.
- **Doorstep Delivery:** Request book delivery securely using **Stripe** payment integration.
- **Verified Reviews:** Leave ratings and comments *only* on books that have been successfully delivered to you.
- **Personal Dashboard:** Track active deliveries, view order history, manage personal reading lists, and access saved wishlists.

### 🏛️ For Librarians (Providers)
- **Inventory Management:** Add new books (with image upload via ImgBB), edit details, and toggle publish/unpublish statuses.
- **Order Processing:** Manage incoming delivery requests and update statuses seamlessly (`Pending` ➔ `Dispatched` ➔ `Delivered`).
- **Analytics Dashboard:** Visualize total books listed, total earnings, and pending requests using interactive charts (Recharts).

### 🛡️ For Administrators
- **Platform Moderation:** Review and approve "Pending Approval" books before they go live on the public feed.
- **User Management:** View all registered users, promote users to Librarians/Admins, or remove them.
- **Global Overview:** Monitor all platform transactions, deliveries, and overall system revenue through visual data.

---

## 🛠️ Tech Stack & NPM Packages

This project utilizes a modern, highly optimized tech stack for maximum performance and security:

| Category | Technologies / Packages Used |
| :--- | :--- |
| **Frontend Framework** | `next` (App Router), `react`, `react-dom` |
| **Styling & UI Components**| `tailwindcss`, `@heroui/react`, `lucide-react`, `react-icons` |
| **Animations** | `framer-motion`, `lottie-react`, `tw-animate-css` |
| **Authentication** | `better-auth`, `@better-auth/mongo-adapter` |
| **Payments** | `stripe`, `@stripe/stripe-js` |
| **Forms & State** | `react-hook-form`, `react-hot-toast` |
| **Data Visualization** | `recharts` |
| **Utilities** | `clsx`, `tailwind-merge`, `swiper`, `react-datepicker` |

---

## 📡 API Endpoints Reference

The backend exposes a highly secure REST API. Below is a structured reference of the primary endpoints used by the client:

### 🌍 Public Routes (No Authentication Required)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/books` | Fetch all published books (supports search, sort, filter, pagination) |
| `GET` | `/api/books/:id` | Fetch details of a specific book |
| `GET` | `/api/books/featured` | Fetch top 6 recently published books for the homepage |
| `GET` | `/api/reviews/:bookId` | Fetch all reviews for a specific book |
| `GET` | `/api/public-stats` | Fetch global stats (Total books, readers, orders) |

### 👤 User Routes (Requires JWT & 'user' Role)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/orders` | Create a new book delivery order (Stripe) |
| `GET` | `/api/orders/user/:email` | Get delivery history for a user |
| `GET` | `/api/orders/check-duplicate`| Check if user has already ordered a specific book |
| `POST` | `/api/wishlist/toggle` | Add/Remove book from wishlist |
| `GET` | `/api/wishlist/:email` | Get full wishlist for a specific user |
| `POST` | `/api/reviews` | Submit a verified review (only if book is delivered) |
| `PATCH`| `/api/reviews/:id` | Update a specific review |
| `DELETE`| `/api/reviews/:id` | Delete a specific review |

### 🏛️ Librarian Routes (Requires JWT & 'librarian'/'admin' Role)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/books` | Add a new book to the inventory (Status: Pending) |
| `GET` | `/api/books/librarian/:email`| Fetch all books owned by the specific librarian |
| `PATCH`| `/api/books/:id/unpublish` | Toggle a book's visibility (Publish/Unpublish) |
| `PATCH`| `/api/books/:id` | Edit details of an existing book |
| `GET` | `/api/orders/librarian/:email`| Fetch all delivery requests for the librarian's books |
| `PATCH`| `/api/orders/:id/status` | Update order delivery status (Pending ➔ Dispatched ➔ Delivered) |

### 🛡️ Admin Routes (Requires JWT & 'admin' Role)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/books/pending` | Fetch all books awaiting approval |
| `PATCH`| `/api/books/:id/approve` | Approve and publish a pending book |
| `GET` | `/api/books/admin/all` | Fetch all books (with pagination) for management |
| `GET` | `/api/orders` | View all platform-wide transactions and deliveries |
| `GET` | `/api/users` | Fetch all registered users |
| `PATCH`| `/api/users/role` | Promote/demote user roles |
| `DELETE`| `/api/users/:id` | Delete a specific user |


🚀 Installation & Setup
Follow these steps to get the project up and running on your local machine:

1. Clone the repository:

git clone [https://github.com/Ashik-Ahammad/biblio-drop-client.git](https://github.com/Ashik-Ahammad/biblio-drop-client.git)
cd biblio-drop-client

2. Install dependencies:

npm install
    or
yarn install

1. Set up Environment Variables:
Create a .env.local file and paste the variables listed above.

1. Run the development server:

npm run dev
5. Open the app:
Open http://localhost:3000 in your browser.

## 🔐 Environment Variables (`.env.local`)

To run this project locally, create a `.env.local` file in the root directory and add the following keys. Ensure you replace the placeholder values with your actual credentials.

```env
# Authentication (Better Auth)
BETTER_AUTH_SECRET=your_super_secret_auth_string
BETTER_AUTH_URL=http://localhost:3000

# Backend API URL
NEXT_PUBLIC_SERVER_URL=http://localhost:8000

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=biblio_drop

# OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Third-Party APIs
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key

# Stripe Payment Gateway
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key

# Email Service (Nodemailer / EmailJS)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

