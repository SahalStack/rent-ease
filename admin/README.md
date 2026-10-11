# RentEase Admin

## Local development

```sh
npm install
cp .env.example .env
npm run dev
```

Set `VITE_SERVER_URL` to the backend API base URL, including its `/api` prefix.
For example: `https://rent-ease-api.onrender.com/api`.

## Deploy to Vercel

1. Import the repository into Vercel and set **Root Directory** to `admin`.
2. Use the Vite defaults, or set the build command to `npm run build` and the
   output directory to `dist`.
3. Add `VITE_SERVER_URL` in Vercel's Environment Variables for each environment
   (Production, Preview, and Development) where the app will run.
4. Deploy or redeploy after setting the variable.

`vercel.json` rewrites app routes to the Vite entry point so routes such as
`/admin/dashboard` continue to work on direct navigation and page refresh.

The backend must allow the deployed Vercel origin through CORS and support
credentialed requests for authentication cookies. `VITE_` variables are bundled
into the browser app, so do not put secrets in them.
