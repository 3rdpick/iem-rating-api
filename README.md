IEM Rating Platform REST API

Layanan Backend RESTful API berbasis Node.js, Express.js, dan MongoDB untuk mengelola data ulasan (review), spesifikasi driver, sound signature, serta penilaian (rating) In-Ear Monitor (IEM).

Identitas Pengembang

Nama: [Isi Nama Lengkap Anda]

NIM: [Isi NIM Anda]

Judul Project: IEM Rating Platform REST API

Repository GitHub: https://github.com/3rdpick/iem-rating-api

Teknologi yang Digunakan

Runtime: Node.js

Framework: Express.js

Database & ODM: MongoDB & Mongoose

Environment Management: Dotenv

Development Server: Nodemon

API Testing: Postman (iem-rating-api.postman_collection.json)

Cara Instalasi

Clone repository ini ke komputer lokal Anda:

git clone https://github.com/3rdpick/iem-rating-api.git
cd iem-rating-api


Install seluruh dependensi menggunakan npm:

npm install


Siapkan konfigurasi Environment Variable dengan membuat file .env di direktori utama proyek (lihat bagian Environment Variable di bawah).

Environment Variable

Buat file bernama .env pada root folder proyek dan isi variabel berikut:

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/iem-rating-db


PORT: Port tempat server Express berjalan (default: 3000).

MONGODB_URI: URI koneksi ke database MongoDB lokal maupun MongoDB Atlas.

Cara Menjalankan Server

Mode Development (dengan Nodemon — auto-restart saat ada perubahan file):

npm run dev


Mode Production / Standar:

npm start


Jika berhasil berjalan, terminal akan menampilkan pesan:

Server berjalan di http://localhost:3000
MongoDB terhubung: 127.0.0.1


Daftar Endpoint API

Base URL lokal: http://localhost:3000

1. Root / Health Check

Method: GET

Endpoint: /

Deskripsi: Mengecek apakah server API aktif dan menampilkan daftar endpoint yang tersedia.

2. Ambil Semua Data IEM (Pencarian & Filter)

Method: GET

Endpoint: /api/iems

Query Parameters (Opsional):

search — Mencari berdasarkan nama model, brand, atau konfigurasi driver (contoh: ?search=rockies)

brand — Filter berdasarkan nama brand secara spesifik (contoh: ?brand=NiceHCK)

signature — Filter berdasarkan karakter suara / sound signature (contoh: ?signature=Balanced)

minRating — Filter berdasarkan batas minimal rating keseluruhan (contoh: ?minRating=8)

Contoh URL: GET /api/iems?search=rockies&minRating=7

3. Ambil Detail Data IEM Berdasarkan ID

Method: GET

Endpoint: /api/iems/:id

Deskripsi: Mengambil satu data ulasan IEM berdasarkan MongoDB ObjectId.

4. Tambah Data Rating IEM Baru

Method: POST

Endpoint: /api/iems

Headers: Content-Type: application/json

Contoh Request Body:

{
  "modelName": "NiceHCK Rockies",
  "brand": "NiceHCK",
  "driverConfig": "1DD + 2BA + 1MicroPlanar",
  "soundSignature": "Balanced",
  "bassRating": 8.2,
  "trebleRating": 8.5,
  "overallRating": 8.4,
  "reviewNotes": "Detail vokal jernih dengan separasi instrumen rapi."
}


5. Perbarui Data Rating IEM

Method: PUT

Endpoint: /api/iems/:id

Headers: Content-Type: application/json

Contoh Request Body:

{
  "overallRating": 8.7,
  "reviewNotes": "Setelah burn-in dan ganti eartips, staging makin rapi."
}


6. Hapus Data Rating IEM

Method: DELETE

Endpoint: /api/iems/:id

Deskripsi: Menghapus data ulasan IEM dari database berdasarkan ID.

Pengujian dengan Postman

Koleksi pengujian endpoint tersedia pada file iem-rating-api.postman_collection.json di dalam repository ini. Anda dapat langsung melakukan Import file tersebut ke aplikasi Postman untuk menguji seluruh request CRUD.
