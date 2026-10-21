# RentEase customer app

React 19 + Vite + Redux Toolkit + Tailwind CSS 4 frontend for the RentEase
rental platform.

## Setup

```bash
npm install
cp .env.example .env    # point the app at your API
npm run dev             # vite dev server on http://localhost:5173
npm run build           # production bundle in dist/
npm run preview         # serve the production bundle locally
npm run lint            # eslint
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL of the API, e.g. `http://localhost:3001/api` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key used by the checkout page |

## Structure

```
pages/       route components
features/    feature scoped components, slices, thunks and selectors
services/    axios calls to the API
ui/          shared presentational components
routes/      route guards
```

## Orders

- `/orders` lists the orders of the signed in customer with status filter,
  search and sorting. The list shows the "no orders yet" state only when the
  customer has no orders at all, and a separate "no orders match your filters"
  state when a filter hides every order.
- Cancelling a pending order asks for confirmation in a modal and then calls
  `DELETE /api/orders/:id`, which marks the order as `cancelled` in the
  database.
- `/orders/:id` shows the details of a single order.
