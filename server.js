require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');
const connectDB = require('./database/connection');
const authRoutes = require('./routes/user-routes')
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const imageRoutes = require('./routes/image-routes')
connectDB();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is now listening on: ', process.env.PORT);
})
app.use('/api/auth', authRoutes);
app.use('/', authRoutes);
app.use('/home', homeRoutes);
app.use('/admin', adminRoutes);
app.use('/image',imageRoutes);