#Validation

React + Express + MongoDB starter for validating an idea with a waitlist.

## GitHub Pages + Tally (No backend required)

The frontend is now configured to run as a static site with Tally form capture.

1. Create your Tally form and copy the public form URL.
2. In GitHub repo, open `Settings -> Secrets and variables -> Actions -> Variables`.
3. Add variable: `VITE_TALLY_FORM_URL` = your Tally URL.
4. In GitHub repo, open `Settings -> Pages`:
- Source: `GitHub Actions`
5. Push to `main` and the workflow deploys automatically.
6. Share your GitHub Pages URL globally.

## Run locally with Docker

```bash
docker-compose up --build
```

- Client: http://localhost:3000
- API: http://localhost:5000 (internal via reverse proxy at `/api/*`)

## Tech stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (official container)
- Dev/Prod run: Docker Compose

## Project shape

- `client/` React landing page + waitlist signup.
- `server/` REST API and Mongo model.
- `docker-compose.yml` to orchestrate API, DB, and frontend.
- `render.yaml` Render API deployment config.
- `client/vercel.json` Vercel frontend deployment config.

## Environment

Create `server/.env` from `.env.example` if needed for local non-container runs.

```bash
cp server/.env.example server/.env
```

Set:

- `MONGODB_URI`
- `PORT`
- `CORS_ORIGIN`
- `ADMIN_TOKEN`

## Waitlist + Admin

- Public waitlist submit: `POST /api/waitlist` (email-only)
- Waitlist count: `GET /api/waitlist/stats`
- Admin list: `GET /api/admin/waitlist` with header `x-admin-token: <ADMIN_TOKEN>`
- Admin CSV export: `GET /api/admin/waitlist.csv?token=<ADMIN_TOKEN>`
- Admin UI: open `/admin` on the frontend deployment

## Deployment Setup

### 1) MongoDB Atlas

- Create a cluster on Atlas and copy the connection URI.
- Set URI in Render API env:
  - `MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority`
- In Atlas Network Access, allow Render egress IPs (or `0.0.0.0/0` for initial testing).

### 2) Render (API)

- Create a new Web Service from this repo.
- Render can auto-detect [`render.yaml`](c:/Users/Sanithu/OneDrive/Documents/Projects/Youtube%20Course/youtube/render.yaml).
- Required env vars on Render:
  - `MONGODB_URI`
  - `CORS_ORIGIN` (set this to your Vercel URL, e.g. `https://your-app.vercel.app`)
  - `ADMIN_TOKEN` (strong secret)
  - `NODE_ENV=production`

### 3) Vercel (Frontend)

- Import `client/` as the project root in Vercel.
- Vercel reads [`client/vercel.json`](c:/Users/Sanithu/OneDrive/Documents/Projects/Youtube%20Course/youtube/client/vercel.json).
- Set frontend env var:
  - `VITE_API_URL=https://your-render-api.onrender.com/api`

After deploy:

- Share landing page URL from Vercel globally.
- Access admin at `https://your-vercel-domain/admin`.
