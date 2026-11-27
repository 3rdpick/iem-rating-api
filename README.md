IEM Rating Platform REST API

Layanan backend RESTful API berbasis Node.js, Express.js, dan MongoDB (Mongoose) untuk mengelola data ulasan, rating, pencarian, dan penyaringan In-Ear Monitor (IEM).

Identitas Mentee
Nama: Yohanes Steven Hasiolan
NIM: 2510512087
Judul Project: IEM Rating Platform REST API
Repository GitHub: https://github.com/3rdpick/iem-rating-api

Cara Instalasi

1. Clone repository ke komputer lokal:
git clone [https://github.com/3rdpick/iem-rating-api.git](https://github.com/3rdpick/iem-rating-api.git)

2. Masuk ke direktori proyek:
cd iem-rating-api


3. Install seluruh dependensi:
npm install

4. Buat file `.env` di folder utama proyek dan isi sesuai bagian Environment Variable.

# Cara Menjalankan Server

Mode pengembangan (nodemon`):
npm run dev

Mode standar (`node`):
node server.js


Setelah berjalan, server akan aktif di `http://localhost:3000`.

Environment Variable

Buat file `.env` pada root folder dengan konfigurasi berikut: 

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/iem_rating_db



Daftar Endpoint

Base URL: `http://localhost:3000`

| `GET` | `/` | Mengecek status server dan daftar endpoint | - |

| `GET` | `/api/iems` | Mengambil semua data IEM dengan opsi pencarian & filter | Query: `?search=&brand=&signature=&minRating=` |

| `GET` | `/api/iems/:id` | Mengambil detail data IEM berdasarkan ID | Param: `id` (MongoDB ObjectId) |

| `POST` | `/api/iems` | Menambahkan data rating & ulasan IEM baru | Body JSON (`modelName`, `brand`, `driverConfig`, `soundSignature`, `bassRating`, `trebleRating`, `overallRating`, `reviewNotes`) |

| `PUT` | `/api/iems/:id` | Memperbarui data IEM berdasarkan ID | Param: `id`, Body JSON field yang diperbarui |

| `DELETE` | `/api/iems/:id` | Menghapus data IEM berdasarkan ID | Param: `id` |
