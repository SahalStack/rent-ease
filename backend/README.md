# RentEase API

Express + Mongoose backend for the RentEase furniture/appliance rental platform.

## Setup

```bash
npm install
cp .env.example .env    # fill in your own values
npm run dev             # nodemon server.js
npm start               # plain node server.js
npm test                # node:test unit tests
```

The server listens on `PORT` (default `3001`) and connects to MongoDB before it
starts accepting traffic.

> Note: `server.js` points the DNS resolver at `8.8.8.8` / `1.1.1.1` when
> `NODE_ENV` is not `production`. Some networks cannot resolve the
> `_mongodb._tcp` SRV record of an Atlas cluster with the system resolver, so
> keep `NODE_ENV=development` for local work.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | `development` enables request logging and the custom DNS resolver |
| `PORT` | Port the HTTP server binds to |
| `MONGODB_URI` | MongoDB connection string |
| `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET` | JWT signing secrets |
| `ACCESS_TOKEN_EXPIRES_IN` / `REFRESH_TOKEN_EXPIRES_IN` | Token lifetimes |
| `STRIPE_SECRET_KEY` | Stripe secret key used for checkout sessions |
| `CLIENT_URL` / `ADMIN_URL` | CORS allow list for the customer and admin apps |
| `CLOUDINARY_*` | Cloudinary credentials for image uploads |

## Structure

```
routes/       express routers, one per resource
controllers/  request validation and response shaping
services/     business rules, talks to the models
models/       mongoose schemas
middleware/   auth, validation, error handling
```

## API

All order routes require `Authorization: Bearer <accessToken>`.

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account |
| `POST` | `/api/auth/login` | Sign in, returns an access token |
| `GET` | `/api/auth/me` | Current user |
| `GET` | `/api/orders` | Orders of the signed in customer |
| `GET` | `/api/orders/:id` | One order of the signed in customer |
| `POST` | `/api/orders` | Create an order |
| `DELETE` | `/api/orders/:id` | Cancel a pending order |
| `GET` | `/api/admin/orders` | Every order (admin role only) |
| `GET` | `/api/dashboard/summary` | Dashboard statistics (admin role only) |
| `POST` | `/api/payments/create-checkout-session` | Stripe checkout session |
| `GET` | `/api/payments/verify-session` | Verify a Stripe session, creates the order |

`DELETE /api/orders/:id` answers `400` when the order is not pending and `404`
when the order does not belong to the signed in customer.
