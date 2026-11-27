require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const iemRoutes = require('./src/routes/iemRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Hubungkan ke MongoDB
connectDB();

// Middleware JSON
app.use(express.json());

// Route utama
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'IEM Rating Platform REST API berjalan',
    endpoints: {
      getAllAndFilter: 'GET /api/iems?search=&brand=&signature=&minRating=',
      getById: 'GET /api/iems/:id',
      create: 'POST /api/iems',
      update: 'PUT /api/iems/:id',
      delete: 'DELETE /api/iems/:id',
    },
  });
});

// Resource routes
app.use('/api/iems', iemRoutes);

// Handler 404 untuk route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal pada server',
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});