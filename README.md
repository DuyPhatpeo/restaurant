# Restaurant Website

Website nhà hàng hiện đại được xây dựng với React và Vite.

## Công nghệ sử dụng

- React 19.1.0
- Vite 6.3.5
- React Router DOM
- Firebase
- Axios
- JSON Server

## Cài đặt

1. Clone project:
```bash
git clone [<repository-url>](https://github.com/DuyPhatpeo/restaurant)
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

- `npm run dev` - Chạy dev server
- `npm run build` - Build production
- `npm run api` - Chạy JSON Server (port 4000)
