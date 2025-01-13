# Plinko Ball Game Backend  

This is the backend for the Plinko Ball Game using PKT cryptocurrency. The project is built using Node.js, Express, and MongoDB. WalletConnect is used for user authentication.  

## Features  

- User authentication with WalletConnect  
- MongoDB for database storage  
- RESTful API with Express  

## Prerequisites  

- Node.js v20.9.0  
- MongoDB  
- npm (usually comes with Node.js)  

## Getting Started  

### Installation  

1. Clone the repository:  

   ```bash  
   cd plinko-game-backend

2. Install dependencies:

   ```bash
   npm install

3. Setup environment variables:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string  
   JWT_SECRET=your_jwt_secret_key  
   PORT=5000  

4. Start the server

   ```bash
   npm start

### Folder Structure

   ```plaintext
   plinko-game-backend/  
   ├── controllers/  
   │   ├── userController.js  
   │   ├── transactionController.js  
   │   ├── gameHistoryController.js  
   ├── middleware/  
   │   └── auth.js  
   ├── models/  
   │   ├── User.js  
   │   ├── Transaction.js  
   │   └── GameHistory.js  
   ├── routes/  
   │   ├── userRoutes.js  
   │   ├── transactionRoutes.js  
   │   └── gameHistoryRoutes.js  
   ├── .env  
   ├── app.js  
   ├── package.json  
   └── README.md