# Restaurant Website

Website nhà hàng hiện đại được xây dựng với React và Vite.

## Công nghệ sử dụng

## Cài đặt

1. Clone project:

```bash
git clone https://github.com/DuyPhatpeo/restaurant
cd restaurant
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file `db.json` ở thư mục root:

```json
{
  "blogs": [],
  "categories": [],
  "chefs": [],
  "comments": [],
  "contacts": [],
  "foods": [],
  "library": [],
  "reservations": [],
  "testimonials": []
}
```

4. Cấu hình Firebase trong `src/utils/firebaseConfig.js`

5. Chạy project:

```bash
npm run dev
npm run api
```

## Scripts

# Restaurant Website

## 🚀 Tính năng nổi bật

- Đặt bàn trực tuyến
- Quản lý blog, bình luận, và thư viện ảnh
- Trang thực đơn động, phân loại món ăn
- Tích hợp Firebase cho xác thực và lưu trữ
- API giả lập với JSON Server
- Responsive UI, hiệu ứng mượt mà

## 🛠️ Công nghệ sử dụng

- [React 19.1.0](https://react.dev/)
- [Vite 6.3.5](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/)
- [Axios](https://axios-http.com/)
- [JSON Server](https://github.com/typicode/json-server)

## ⚡ Cài đặt & Khởi chạy

1. **Clone project:**

```bash
git clone https://github.com/DuyPhatpeo/restaurant
cd restaurant
```

2. **Cài đặt dependencies:**

```bash
npm install
```

3. **Tạo file `db.json` ở thư mục gốc:**

```json
{
  "blogs": [],
  "categories": [],
  "chefs": [],
  "comments": [],
  "contacts": [],
  "foods": [],
  "library": [],
  "reservations": [],
  "testimonials": []
}
```

4. **Cấu hình Firebase:**

- Tạo project trên [Firebase Console](https://console.firebase.google.com/)
- Lấy config và cập nhật vào `src/lib/firebaseConfig.js`

5. **Chạy project:**

```bash
npm run api      # Chạy JSON Server (port 4000)
npm run dev      # Chạy Vite dev server
```

## 📜 Scripts

- `npm run dev` — Chạy dev server Vite
- `npm run build` — Build production
- `npm run api` — Chạy JSON Server (port 4000)
- `npm run lint` — Kiểm tra code với ESLint
- `npm run preview` — Xem thử bản build

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo pull request hoặc issue nếu bạn muốn cải thiện dự án.

## 📄 License

Dự án sử dụng giấy phép MIT.
