# E-Commerce Web Application - Backend

## Overview

The **E-Commerce Web Application - Backend** is a robust backend service designed to power the frontend of an online store. Built with **Node.js** and **Express.js**, it provides a RESTful API for managing products, user accounts, and orders.
## Features

- **User Management**: Handles user registration, authentication, and profile management.
- **Product Management**: Allows for CRUD (Create, Read, Update, Delete) operations on products.
- **Order Processing**: Manages shopping cart functionality, order creation, and status tracking.
- **Secure Authentication**: Uses JWT (JSON Web Tokens) for secure user authentication.
- **Database Integration**: Connects to a **MongoDB** database for persistent data storage.
- **API Documentation**: Provides a comprehensive API documentation for easy integration with the frontend.

## Technologies Used

- **Node.js**: JavaScript runtime environment for building scalable network applications.
- **Express.js**: Web application framework for Node.js to build RESTful APIs.
- **MongoDB**: NoSQL database for storing product and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for secure authentication.
- **dotenv**: For managing environment variables.

## Getting Started

### Prerequisites

- **Node.js** (version 20.11.1 or higher)
- **MongoDB** (locally installed or cloud-based service like MongoDB Atlas)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/E-CommerceWebAPP-Backend.git
    cd E-CommerceWebAPP-Backend
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    DB_URL=mongodb://localhost:27017/ecommerce
    JWT_SECRET=your_jwt_secret
    PORT=5000
    PASS_SECRET=1234
    USER=(nodemailer account)
    PASSWORD=(nodemailer account)
    STRIPE_SECRET_KEY=sk_test
    STRIPE_PUBLIC_KEY=pk_test
    BASE_URL = http://localhost:3001
    ```

4. **Start the server:**
    ```bash
    npm start
    ```

5. **Test the API:**
   The API will be available at `http://localhost:5000`. You can use tools like Postman or cURL to test the endpoints.

## API Endpoints

### Authentication and Users

- **`POST /api/authUser/register`**: Register a new user.
- **`POST /api/authUser/login`**: Authenticate a user and obtain a JWT.
- **`POST /api/authUser/logout`**: Log out the current user.
- **`POST /api/authUser/refresh_token`**: Refresh the JWT token.

### Cart

- **`POST /api/cart/create`**: Create a new cart. (Admin only)
- **`PUT /api/cart/add`**: Add a product to the cart.
- **`PUT /api/cart/edit`**: Edit the quantity of a product in the cart.
- **`DELETE /api/cart/deleteAll`**: Remove all items from the cart.
- **`DELETE /api/cart/deleteProduct`**: Remove a specific product from the cart.
- **`GET /api/cart/find`**: Retrieve the user's cart.
- **`GET /api/cart/findAll`**: Retrieve all carts. (Admin only)

### Categories

- **`POST /api/categories/add`**: Create a new category. (Admin only)
- **`PUT /api/categories/:id`**: Update an existing category. (Admin only)
- **`DELETE /api/categories/:id`**: Delete a category. (Admin only)
- **`GET /api/categories`**: Retrieve all categories.
- **`GET /api/categories/:id`**: Retrieve a specific category by ID.
- **`GET /api/categories/:id/subcategories`**: Retrieve subcategories for a specific category.
- **`GET /api/categoriesTree`**: Retrieve the category tree structure.

### Favourites

- **`POST /api/favourites/create`**: Create a new favourites list. (Admin only)
- **`PUT /api/favourites/add`**: Add a product to the user's favourites list.
- **`DELETE /api/favourites/deleteProduct/:productId`**: Remove a specific product from the user's favourites list.
- **`DELETE /api/favourites/deleteAll`**: Delete all items from the user's favourites list.
- **`GET /api/favourites/find`**: Retrieve the user's favourites list.
- **`GET /api/favourites/findAll`**: Retrieve all favourites across all users. (Admin only)

### Orders

- **`POST /api/createOrder`**: Create a new order. (Customer only)
- **`PUT /api/cancel/:id`**: Cancel an existing order.
- **`GET /api/order/:id`**: Retrieve details of a specific order.
- **`GET /api/find`**: Retrieve all orders by user.
- **`PUT /api/editOrderStatus/:id`**: Update the status of an order. (Admin and Distributor only)

### Products

- **`POST /api/add`**: Create a new product. (Authorized Distributor only)
- **`PUT /api/edit/:productId`**: Update an existing product. (Authorized Distributor only)
- **`DELETE /api/delete/:productId`**: Delete a product. (Authorized Distributor only)
- **`GET /api/find/:id`**: Retrieve a product by ID.
- **`GET /api/findAll`**: Retrieve all products.
- **`GET /api/findCategory/:category`**: Retrieve products by category.
- **`GET /api/findDistributor/:id`**: Retrieve products by distributor.
- **`GET /api/search`**: Search for products.
- **`POST /api/findFilter`**: Filter products based on criteria.

### Questions

- **`POST /api/addQuestion`**: Add a question about a product. (Customer only)
- **`DELETE /api/deleteQuestion`**: Delete a question. (Admin only)
- **`GET /api/findQuestion/:productId`**: Retrieve all questions for a product.
- **`GET /api/findUserQuestion/:userId`**: Retrieve all questions asked by a user.

### Replies

- **`POST /api/addReply`**: Add a reply to a question. (Authorized)
- **`DELETE /api/deleteReply`**: Delete a reply. (Admin only)

### Reviews

- **`POST /api/addReview`**: Add a review to a product. (Customer only)
- **`GET /api/getReviewsForProduct/:productId`**: Retrieve reviews for a product.
- **`GET /api/getReviews`**: Retrieve all reviews.
- **`DELETE /api/deleteReview`**: Delete a review. (Admin only)

### User Management

- **`PUT /api/edit`**: Update the current user's profile.
- **`PUT /api/editByAdmin`**: Update a user profile by an admin.
- **`DELETE /api/delete`**: Delete the current user.
- **`GET /api/find/:id`**: Retrieve a specific user by ID.
- **`GET /api/all`**: Retrieve all users. (Admin only)
- **`GET /api/confirmAccount/:token`**: Confirm user account activation.
- **`GET /api/resendVerificationEmail`**: Resend verification email to the user.

