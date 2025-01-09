const express = require('express');  
const connectDB = require('./config/db');  
require('dotenv').config();

connectDB();  

const app = express();  

app.use(express.json());  

app.use('/api/auth', require('./routes/authRoutes'));  
app.use('/api/user', require('./routes/userRoutes'));  
app.use('/api/admin', require('./routes/adminRoutes'));  

const PORT = process.env.PORT || 3000;  

app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);  
});  