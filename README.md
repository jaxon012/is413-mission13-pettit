# IS 413 — Online Bookstore (Mission 13 / Phase 6)

Full-stack bookstore app continuing from earlier missions: public catalog with pagination, sorting, category filter, and shopping cart; **admin CRUD** for books; **Azure-ready** SPA routing via `routes.json`.

## Stack

| Layer | Technology |
|--------|------------|
| API | ASP.NET Core Web API, EF Core, SQLite |
| UI | React, Vite, TypeScript, Bootstrap |

## Repository layout

```
BookstoreApi/              # Web API (see appsettings.json for DB path)
bookstore-frontend/        # Vite + React SPA
bookstore-frontend/public/routes.json   # SPA fallback for Azure (see below)
```

## Branch

Mission 13 / Phase 6 work lives on branch **`mission-13`** (or your instructor’s required branch name).

## Run locally

### 1. API

```bash
cd BookstoreApi
dotnet restore
dotnet run
```

Default base URL: **`https://localhost:5000`**

### 2. Frontend

```bash
cd bookstore-frontend
npm install
npm run dev
```

Open the URL Vite prints (usually **`http://localhost:5173`**).

The UI calls the API at **`https://localhost:5000/api/books`** by default. To point at another base URL (for example a deployed API), set:

```bash
# bookstore-frontend/.env.local (do not commit secrets)
VITE_API_BASE_URL=https://your-api-host.example.com/api/books
```

Rebuild after changing environment variables (`npm run build`).

## App routes (React)

| Path | Description |
|------|-------------|
| `/` | Bookstore catalog (filter, sort, pagination, add to cart) |
| `/cart` | Shopping cart (sessionStorage) |
| `/adminbooks` | Admin: list, add, edit, delete books |

## API endpoints (`/api/books`)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/books` | Paginated list (`pageSize`, `pageNum`, `sortOrder`, optional `category`) |
| GET | `/api/books/categories` | Distinct categories |
| GET | `/api/books/all` | All books (admin list) |
| GET | `/api/books/{id}` | Single book |
| POST | `/api/books` | Create book |
| PUT | `/api/books/{id}` | Update book (URL `id` must match body `bookId`) |
| DELETE | `/api/books/{id}` | Delete book |

Paged list response shape:

```json
{
  "books": [ ],
  "totalNumBooks": 0
}
```

## `routes.json` (Azure / SPA)

`bookstore-frontend/public/routes.json` tells static hosts to serve **`index.html`** for paths like **`/adminbooks`**, so deep links and refreshes work after deployment instead of returning 404.

## CORS

The API allows browser requests from **localhost** (HTTP/HTTPS) and **`https://*.azurestaticapps.net`**. Add other production origins in `Program.cs` if you use a custom domain.

## Build for production

```bash
cd bookstore-frontend
npm run build
```

Output: `bookstore-frontend/dist/` (includes `routes.json` from `public/`).

## Azure (summary)

Typical setup: **Static Web Apps** for the React `dist` folder, **App Service** for the ASP.NET API. Set **`VITE_API_BASE_URL`** at build time to your deployed API’s `.../api/books` base URL, configure the API connection string / SQLite path on the server, and confirm CORS for your static site origin.

## Author

BYU IS 413 — Hilton (Mission 13).
