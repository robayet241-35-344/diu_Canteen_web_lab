# Campus Canteen Order System

A simple full-stack project: React (frontend) + Node.js/Express (backend) + MySQL (database).

## Folder structure

```
canteen-app/
├── .gitignore
├── README.md
├── backend/
│   ├── controllers/
│   │   └── orderController.js
│   ├── routes/
│   │   └── orderRoutes.js
│   ├── .env.example
│   ├── db.js
│   ├── server.js
│   ├── schema.sql
│   └── package.json
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ItemList.jsx
        │   ├── OrderForm.jsx
        │   └── OrderList.jsx
        ├── App.jsx
        ├── App.css
        └── main.jsx
```

## How it works (in short)

1. React (`OrderForm.jsx`) sends the order to Express with `fetch()`.
2. Express (`orderController.js`) runs an `INSERT` into MySQL and **waits** for it to finish.
3. Only after the insert succeeds does Express reply back to React.
4. React then calls `GET /api/orders` again, which reads the fresh data straight from MySQL.
5. The "Recent Orders" table re-renders with the new row — no page reload needed.

So the table is never showing fake/temporary data — every row you see came from a real `SELECT` on the database, run right after the `INSERT` completed.

## Setup

### 1. Database
```bash
mysql -u root -p < backend/schema.sql
```
This creates the `canteen_db` database and the `orders` table.

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and put in your own MySQL username/password, then:
```bash
npm start
```
Runs on **http://localhost:5000**

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on **http://localhost:5173**

Open that URL in your browser — place an order and watch it appear in the table.

## API Endpoints

| Method | Endpoint      | Description        |
|--------|---------------|---------------------|
| GET    | /api/orders   | Get all orders      |
| POST   | /api/orders   | Place a new order   |

## Uploading to GitHub

From the `canteen-app` folder:
```bash
git init
git add .
git commit -m "Initial commit - Campus Canteen Order System"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```
The `.gitignore` file already excludes `node_modules/` and `.env`, so your MySQL password stays private and the repo stays small. Anyone cloning it just needs to follow the Setup steps above with their own `.env`.
