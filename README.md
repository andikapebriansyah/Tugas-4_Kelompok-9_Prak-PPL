# Manhwa API (TypeScript Version)

API ini memungkinkan pengguna untuk mengelola daftar manhwa dengan fitur **GET, POST, PUT, dan DELETE** berdasarkan beberapa atribut seperti `title`, `author`, `genre`, `status`, dan `rating`.

---

## **📌 Instalasi dan Menjalankan Server**

1. **Clone repository ini**
```bash
git clone https://github.com/username/manhwa-api-typescript.git
cd manhwa-api-typescript
```

2. **Install dependencies**
```bash
npm install
```

3. **Jalankan server**
```bash
ts-node server.ts
```

Atau jika menggunakan `nodemon`:
```bash
nodemon --exec ts-node server.ts
```

Server akan berjalan di `http://localhost:3000`.

---

## **🔹 Endpoint API dengan CMD**

### **📖 1️⃣ GET Semua Manhwa**
```bash
curl -X GET http://localhost:3000/manhwa | python -m json.tool
```

### **🔍 2️⃣ GET Manhwa Berdasarkan Kriteria**
API mendukung pencarian berdasarkan **title, author, genre, status, dan rating**.

- **Berdasarkan ID**
```bash
curl -X GET http://localhost:3000/manhwa/1 | python -m json.tool
```

- **Berdasarkan Genre**
```bash
curl -X GET "http://localhost:3000/manhwa?genre=Action" | python -m json.tool
```

- **Berdasarkan Judul**
```bash
curl -X GET "http://localhost:3000/manhwa?title=Solo+Leveling" | python -m json.tool
```

- **Berdasarkan Author**
```bash
curl -X GET "http://localhost:3000/manhwa?author=Chugong" | python -m json.tool
```

- **Berdasarkan Status**
```bash
curl -X GET "http://localhost:3000/manhwa?status=Completed" | python -m json.tool
```

- **Berdasarkan Rating**
```bash
curl -X GET "http://localhost:3000/manhwa?rating=9.5" | python -m json.tool
```

📌 **GET dengan Sorting (Ascending/Descending)**
```bash
curl -X GET "http://localhost:3000/manhwa?sort=asc" | python -m json.tool
curl -X GET "http://localhost:3000/manhwa?sort=desc" | python -m json.tool
```

---

### **➕ 3️⃣ POST Tambah Manhwa Baru**
```bash
curl -X POST "http://localhost:3000/manhwa" -H "Content-Type: application/json" \
-d "{\"title\": \"Omniscient Reader\", \"author\": \"Sing-Shong\", \"genre\": \"Fantasy\", \"status\": \"Ongoing\", \"rating\": 9.3}" | python -m json.tool
```

---

### **📝 4️⃣ PUT Update Manhwa**
- **Update Banyak Field (contoh ID = 4)**
```bash
curl -X PUT http://localhost:3000/manhwa/4 -H "Content-Type: application/json" \
-d "{ \"title\": \"Noblesse\", \"author\": \"Son Jeho\", \"genre\": \"Supernatural\", \"status\": \"Completed\", \"rating\": 8.9 }" | python -m json.tool
```

- **Update Satu Field (contoh ID = 3)**
```bash
curl -X PUT http://localhost:3000/manhwa/3 -H "Content-Type: application/json" \
-d '{ "rating": 10 }' | python -m json.tool
```

---

### **🗑️ 5️⃣ DELETE Hapus Manhwa**
- **Berdasarkan ID**
```bash
curl -X DELETE http://localhost:3000/manhwa/3 | python -m json.tool
```

- **Berdasarkan Judul**
```bash
curl -X DELETE "http://localhost:3000/manhwa?title=Solo+Leveling" | python -m json.tool
```

- **Berdasarkan Author**
```bash
curl -X DELETE "http://localhost:3000/manhwa?author=Chugong" | python -m json.tool
```

- **Berdasarkan Genre**
```bash
curl -X DELETE "http://localhost:3000/manhwa?genre=Fantasy" | python -m json.tool
```

- **Berdasarkan Status**
```bash
curl -X DELETE "http://localhost:3000/manhwa?status=Ongoing" | python -m json.tool
```

- **Berdasarkan Rating**
```bash
curl -X DELETE "http://localhost:3000/manhwa?rating=9.3" | python -m json.tool
```

---

## **📂 Struktur Folder**
```
📂 project-folder
 ┣ 📂 controller
 ┃ ┗ 📜 manhwaController.ts
 ┣ 📂 models
 ┃ ┗ 📜 manhwaModel.ts
 ┣ 📂 routes
 ┃ ┗ 📜 manhwaRoutes.ts
 ┣ 📜 server.ts
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┣ 📜 README.md
```

---

## **⚙️ TypeScript Configuration**
File `tsconfig.json` contoh:
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

## **📦 Package Dependencies**
Contoh bagian dependencies di `package.json`:
```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.18",
    "@types/node": "^20.6.3",
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.2.2"
  }
}
```

---

## **⚖️ Lisensi**
MIT License.

---

## **ℹ️ Catatan**
- Jika terjadi error `curl: (6) Could not resolve host`, pastikan URL dalam tanda kutip (`"..."`).
- Untuk query yang mengandung spasi, gunakan `+` (contoh: `title=Solo+Leveling`).
- Pastikan TypeScript dan ts-node terinstal secara global atau sebagai dev dependency.

🎯 **Selamat mencoba! 🚀**