# Inventory App

## Overview
This is a simple inventory application built with TypeScript. It provides a CRUD interface for managing products, allowing users to create, read, update, and delete product entries. The application uses a modern ORM for database interactions.

## Project Structure
```
inventory-app
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers           # Contains controllers for handling requests
│   │   └── productController.ts
│   ├── models                # Defines the data models
│   │   └── product.ts
│   ├── routes                # Defines the application routes
│   │   └── productRoutes.ts
│   ├── db                   # Database connection and configuration
│   │   └── index.ts
│   └── types                 # Type definitions for TypeScript
│       └── product.d.ts
├── package.json              # NPM package configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd inventory-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure the database:**
   Update the database connection settings in `src/db/index.ts` as needed.

4. **Run the application:**
   ```
   npm start
   ```

## Usage
- **Create a Product:** Send a POST request to `/products` with the product details.
- **Get a Product:** Send a GET request to `/products/:id` to retrieve a specific product.
- **Update a Product:** Send a PUT request to `/products/:id` with the updated product details.
- **Delete a Product:** Send a DELETE request to `/products/:id` to remove a product.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.