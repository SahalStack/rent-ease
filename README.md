# RentEase

Monorepo for the RentEase furniture and appliance rental platform.

| Folder | Stack | Purpose |
| --- | --- | --- |
| `frontend` | React 19, Vite, Redux Toolkit, Tailwind CSS | Customer storefront and account area |
| `admin` | React 19, Vite, Tailwind CSS | Admin dashboard for users, products and orders |
| `backend` | Node, Express, Mongoose | REST API, Stripe checkout, JWT auth |

## Running the project

Three terminals, one per app:

```bash
cd backend  && npm install && cp .env.example .env && npm run dev   # http://localhost:3001
cd frontend && npm install && cp .env.example .env && npm run dev   # http://localhost:5173
cd admin    && npm install && cp .env.example .env && npm run dev   # http://localhost:5174
```

Every app reads its own `.env`:

- `backend/.env` – MongoDB URI, JWT secrets, Stripe key, CORS origins
- `frontend/.env` – `VITE_API_BASE_URL`, `VITE_STRIPE_PUBLISHABLE_KEY`
- `admin/.env` – `VITE_SERVER_URL`

See the README inside each folder for the details.

## Tests

```bash
cd backend && npm test
```

The backend tests run on the Node.js built in test runner, no extra tooling
and no database required.

## Order lifecycle

`pending → active → completed` with `cancelled` as the terminal state for
orders that are cancelled while pending. The customer can only cancel a
`pending` order, the action asks for confirmation and the new status is
written to MongoDB.
