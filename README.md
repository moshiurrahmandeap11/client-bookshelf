# BookShelf - Digital Library & Book Selling Platform

## Project Overview

BookShelf is a full-stack web application that enables users to discover, purchase, read, and manage digital books. The platform supports user authentication, book management, shopping cart functionality, wishlist, reviews and ratings system, admin dashboard, and complete content management capabilities.

## Technology Stack

### Frontend
- Next.js  (App Router)
- React
- Tailwind CSS
- Lucide React Icons
- React Icons
- SweetAlert2
- Axios
- Recharts for analytics

### Backend
- Node.js
- Express.js
- MongoDB with native driver
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for image upload and management
- Nodemailer for email services
- Multer for file handling

## Features

### User Features
- User registration and login with JWT authentication
- Profile management with avatar upload functionality
- Browse and search books with advanced filtering options
- Book details page with complete information display
- Add books to shopping cart with quantity management
- Save books to wishlist for future reference
- Write and manage book reviews and ratings
- View order history and tracking

### Author Features
- Upload and manage personal book listings
- Edit book details including title, author, price, and description
- Upload book thumbnails and multiple gallery images
- Track book sales and earnings
- Manage inventory and stock status

### Admin Features
- Complete admin dashboard with analytics and charts
- User management with view, edit, and delete capabilities
- Role management for assigning admin privileges
- Book management for approve, edit, and delete listings
- Category management for create, edit, and delete operations
- Contact message management with reply system
- Site settings management for logo, favicon, and SEO metadata
- View system statistics and reports

### E-commerce Features
- Shopping cart with quantity management
- Order summary with tax and shipping calculation
- Secure checkout process
- Order confirmation emails
- Refund request system

### Content Management
- Dynamic homepage with featured books section
- Category browsing with book counts
- About page with company information
- Help center with FAQs section
- Privacy policy and terms pages
- Contact form with email notifications

## API Endpoints

### Authentication Routes
POST   /api/users/register     Register new user account
POST   /api/users/login        User login with email and password
GET    /api/users/me           Get current user profile information
PUT    /api/users/edit         Update user profile with image upload
DELETE /api/users/delete       Delete user account
POST   /api/users/logout       User logout endpoint

### Book Routes
GET    /api/books              Get all books with filters and pagination
GET    /api/books/:id          Get single book by ID
POST   /api/books              Create new book listing with images
PUT    /api/books/:id          Update existing book information
DELETE /api/books/:id          Delete book and associated images
GET    /api/books/user/me      Get books uploaded by current user

### Review Routes
POST   /api/books/:id/reviews          Add review to book
PUT    /api/books/:id/reviews/:reviewId Update existing review
DELETE /api/books/:id/reviews/:reviewId Delete review

### Category Routes
GET    /api/categories         Get all categories
GET    /api/categories/:id     Get single category by ID
POST   /api/categories         Create new category (admin only)
PUT    /api/categories/:id     Update category information (admin only)
DELETE /api/categories/:id     Delete category (admin only)

### Contact Routes
POST   /api/contact            Submit contact form message
GET    /api/contact            Get all contact messages (admin only)
GET    /api/contact/:id        Get single message details (admin only)
PUT    /api/contact/:id/status Update message status (admin only)
PUT    /api/contact/:id/reply  Send reply to user email (admin only)
DELETE /api/contact/:id        Delete contact message (admin only)

### Settings Routes

GET    /api/settings           Get current site settings
PUT    /api/settings           Update site settings with images (admin only)
POST   /api/settings/reset     Reset settings to default values (admin only)

### Upload Routes
POST   /api/upload/single/:folder   Upload single file to specified folder
POST   /api/upload/multiple/:folder Upload multiple files to specified folder
DELETE /api/upload/delete           Delete uploaded file from Cloudinary

## Installation Guide

### Prerequisites
- Node.js version 18 or higher
- MongoDB database (local installation or MongoDB Atlas)
- Cloudinary account for image storage
- Gmail account for SMTP email service (optional)

## Folder Structure

### Backend Directory Structure

backend/
├── config/
│   └── cloudinary.js
├── controllers/
│   ├── authControllers.js
│   ├── bookControllers.js
│   ├── categoryControllers.js
│   ├── contactController.js
│   ├── settingsController.js
│   └── uploadController.js
├── database/
│   └── db.js
├── middleware/
│   ├── verifyToken.js
│   ├── generateToken.js
│   └── upload.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   ├── categoryRoutes.js
│   ├── contactRoutes.js
│   ├── settingsRoutes.js
│   └── uploadRoutes.js
├── .env
└── index.js

### Frontend Directory Structure


frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.jsx
│   │   └── register/
│   │       └── page.jsx
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── books/
│   │   │   │   ├── add/
│   │   │   │   │   └── page.jsx
│   │   │   │   ├── edit/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.jsx
│   │   │   │   └── page.jsx
│   │   │   ├── categories/
│   │   │   │   └── page.jsx
│   │   │   ├── contacts/
│   │   │   │   └── page.jsx
│   │   │   ├── settings/
│   │   │   │   └── page.jsx
│   │   │   ├── users/
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   └── layout.jsx
│   ├── about/
│   │   └── page.jsx
│   ├── browse/
│   │   └── page.jsx
│   ├── books/
│   │   └── [id]/
│   │       └── page.jsx
│   ├── cart/
│   │   └── page.jsx
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.jsx
│   ├── contact/
│   │   └── page.jsx
│   ├── cookies/
│   │   └── page.jsx
│   ├── faqs/
│   │   └── page.jsx
│   ├── help/
│   │   └── page.jsx
│   ├── privacy/
│   │   └── page.jsx
│   ├── profile/
│   │   ├── edit/
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   └── page.jsx
│   ├── refund/
│   │   └── page.jsx
│   ├── terms/
│   │   └── page.jsx
│   ├── wishlist/
│   │   └── page.jsx
│   ├── layout.js
│   └── page.jsx
├── components/
│   ├── admin/
│   │   ├── Sidebar.jsx
│   │   └── HeaderAdmin.jsx
│   ├── homeComponents/
│   │   ├── BrowseCategory.jsx
│   │   ├── FeaturedBook.jsx
│   │   ├── Hero.jsx
│   │   ├── OfferingToJoin.jsx
│   │   ├── Testimonial.jsx
│   │   └── whyBookshelf.jsx
│   └── sharedComponents/
│       └── axiosInstance/
│           └── axiosInstance.js
├── contexts/
│   └── AuthProvider.jsx
├── hooks/
│   └── useAuth.js
└── .env.local


## Key Features Implementation

### Authentication System
The platform uses JWT tokens for authentication. Upon login, the server generates a token that is stored in localStorage. Protected routes verify this token before allowing access. Role-based access control distinguishes between regular users and administrators.

### Image Upload
All image uploads are handled through Cloudinary. The multer middleware processes incoming files and uploads them to Cloudinary storage. The returned URLs are stored in the database. Supported formats include JPEG, PNG, GIF, WEBP, and ICO.

### Email System
Nodemailer is configured to send automated emails for contact form submissions, order confirmations, and support replies. The system uses Gmail SMTP by default but can be configured for any SMTP provider.

### Shopping Cart
Cart functionality is implemented using localStorage. Items added to the cart persist across browser sessions. Quantity can be adjusted, and items can be removed. The cart count badge updates in real time across all pages.

### Admin Dashboard
The admin panel provides comprehensive management tools including user management, book management, category management, contact message handling, and site settings configuration. All admin actions are protected by role verification middleware.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For support or inquiries, please contact:
- Email: moshiurrahmandeap@gmail.com
- Through the contact form on the website

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Cloudinary for image hosting services
- All open source contributors