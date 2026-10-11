# Frontend Performance Audit

This audit focuses on where the app can slow down and where `useMemo` / `useCallback` are actually useful. The biggest bottlenecks are not React memo hooks first; they are repeated API calls, missing pagination, unoptimized images, and expensive selectors/logging.

## Highest Impact Slow Spots

```

### 2. Product pagination UI exists, but API returns all matching products

Files:

- `backend/controllers/productController.js`
- `frontend/src/services/productApiService.js`
- `frontend/src/features/Product/productSlice.js`
- `frontend/src/features/Product/productSelectors.js`
- `frontend/src/hooks/useProducts.js`
- `frontend/src/pages/Products.jsx`
- `frontend/src/features/Product/ProductPagination.jsx`

Current flow:

- Backend does `Product.find(filter)` and returns every matching product.
- Response returns `TotalProducts`, but no `page`, `limit`, or `totalPages`.
- Frontend selectors expect `currentPage` and `totalPages`, but `productSlice` does not store them.
- `Products.jsx` expects `totalPages` from `useProducts`, but `useProducts` does not return it.

Why it slows:

- As product count grows, every product list request gets heavier.
- More data means more JSON parsing, more image URLs, more React elements, and more DOM nodes.
- Pagination buttons are not protecting the app from rendering/fetching too much.

Recommended fix:

- Add backend pagination with `page`, `limit`, `skip`, `countDocuments`, and `totalPages`.
- Return metadata like `{ products, currentPage, totalPages, totalProducts }`.
- Store that metadata in `productSlice`.
- Return `totalPages` from `useProducts`.

Where `useMemo` helps:

- `ProductPagination` can memoize the generated `pages` array if `totalPages` can become large.

```jsx
const pages = useMemo(
  () => Array.from({ length: totalPages }, (_, index) => index + 1),
  [totalPages]
);
```

Note: backend pagination matters far more than memoizing the page array.

### 4. Order filtering selector recalculates and logs on every selector run

Files:

- `src/features/Orders/orderSelectors.js`
- `src/pages/Orders.jsx`

Current issue:

- `selectFilteredOrders` copies, filters, searches, sorts, and logs every time it runs.
- Because it returns a new array each time, it can cause avoidable re-renders.

Why it slows:

- Sorting with `new Date(...)` inside the selector can become expensive with many orders.
- Console logs inside selectors add noise and main-thread work.
- Any store update can force this derived array to be recalculated.

Recommended fix:

- Use `createSelector` from `@reduxjs/toolkit` or `reselect`.
- Remove console logs.
- Memoize lowercase search query once inside the selector.

Where `useMemo` helps:

- Prefer memoized Redux selectors over component-level `useMemo` here.
- If logic stays inside `Orders.jsx`, then `useMemo` could compute filtered orders from `orders`, `searchQuery`, `statusFilter`, and `sortBy`, but selector-level memoization is cleaner.

Example target:

```js
import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredOrders = createSelector(
  [selectAllOrders, selectSearchQuery, selectStatusFilter, selectSortBy],
  (orders, searchQuery, statusFilter, sortBy) => {
    let result = [...orders];
    const normalizedSearch = searchQuery.trim().toLowerCase();

    if (statusFilter !== "all") {
      result = result.filter((order) => order.orderStatus === statusFilter);
    }

    if (normalizedSearch.length >= 4) {
      result = result.filter((order) =>
        order.items?.some((item) =>
          item.name?.toLowerCase().includes(normalizedSearch)
        )
      );
    }

    return result.sort(/* existing sort logic */);
  }
);
```

### 5. Console logs are still in hot paths

Files found with logs include:

- `src/hooks/useProducts.js`
- `src/features/Product/productThunk.js`
- `src/features/Product/productSlice.js`
- `src/services/productApiService.js`
- `src/features/Orders/orderSelectors.js`
- `src/features/Orders/orderSlice.js`
- `src/features/Orders/orderThunk.js`
- `src/pages/Cart.jsx`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/pages/OrderDetails.jsx`
- `src/pages/Success.jsx`
- `src/features/Profile/AddressInfo.jsx`
- `src/features/Profile/PersonalInfo.jsx`

Why it slows:

- Logs inside render paths, selectors, and frequent async flows can noticeably slow dev builds.
- They make real performance debugging harder.

Recommended fix:

- Remove logs or gate them behind `import.meta.env.DEV`.

```js
if (import.meta.env.DEV) {
  console.log("Fetching:", query);
}
```

### 6. Duplicate Google Material Symbols stylesheet

File:

- `index.html`

Current issue:

- Material Symbols is loaded twice.

Why it slows:

- It creates avoidable stylesheet/font request work.

Recommended fix:

- Remove the duplicate Material Symbols `<link>`.
- Consider narrowing icon font axes if possible.

### 7. Home page imports animation code in many sections

Files:

- `src/features/Home/Hero.jsx`
- `src/features/Home/FeaturedSection.jsx`
- `src/features/Home/FeaturedCategory.jsx`
- `src/features/Home/HowItWorks.jsx`
- `src/features/Home/Benefit.jsx`
- `src/features/Home/Testimonials.jsx`

Current issue:

- The Home route imports `motion/react` in several sections.

Why it can slow:

- Animation library code adds JS weight.
- Many viewport animations can add runtime work on lower-end devices.

Recommended fix:

- Keep animation if it is important to the experience.
- Avoid animating every small element.
- Consider replacing simple fade/slide animations with CSS animations for static sections.

Where `useMemo` / `useCallback` helps:

- Not much. Bundle/runtime animation cost is the issue.

## Where To Use `useMemo`

Use `useMemo` for derived data that is expensive or creates new arrays/objects used by memoized children.

Good candidates:

- `src/features/Orders/orderSelectors.js`: use `createSelector` instead of component `useMemo`.
- `src/features/Product/ProductPagination.jsx`: memoize `pages` if `totalPages` can grow.
- `src/pages/Orders.jsx`: memoize flattened order items if you keep rendering `orders.map(order => order.items.map(...))`.
- Product filtering/sorting, if it ever moves client-side instead of backend-side.

Possible `Orders.jsx` target:

```jsx
const orderItems = useMemo(
  () => orders.flatMap((order) =>
    order.items.map((item) => ({ item, order }))
  ),
  [orders]
);
```

Then render `orderItems.map(({ item, order }) => ...)`.

Avoid `useMemo` for:

- Simple values like `selectedPrice`, `currentPage`, `search`, `sort`.
- JSX that is cheap and not passed to memoized children.
- Fixing API over-fetching. Pagination/debounce is the real solution.

## Where To Use `useCallback`

Use `useCallback` when a function is passed to memoized children or used as a stable dependency.

Good candidates:

- `src/hooks/useFilterParams.js`: `updateParam` should be stable because it is passed into `ProductSearch`, `Filter`, `ProductPagination`, and filter child components.
- `src/features/Product/ProductSearch.jsx`: `handleSearchChange`, `handleSortChange`, and clear search handler if `ProductSearch` or children are memoized.
- `src/features/Product/ProductCategories.jsx`: `handleCategoryChange` if `CategoryOption` is wrapped in `React.memo`.
- `src/features/Product/ProductPriceRange.jsx`: `handlePriceChange`, ideally debounced/throttled because range inputs fire many changes.
- `src/features/Product/ProductAvailability.jsx`: `handleAvailabilityChange` if `AvailabilityOption` is memoized.
- `src/features/Product/ProductCard.jsx`: a `handleCardClick` callback only matters if `ProductCard` is wrapped in `React.memo` or passed deeper.

Avoid `useCallback` for:

- Every small inline handler by default.
- Components that are not memoized and do not pass handlers to memoized children.
- Replacing debouncing. Stable callbacks do not reduce API calls by themselves.

## Component Memoization Candidates

Use `React.memo` only when props are stable and the component re-renders often.

Good candidates:

- `ProductCard`
- `CategoryOption`
- `AvailabilityOption`
- `StatsCard`
- `OrderCard`

Important:

- `React.memo(ProductCard)` helps only if `product` object references stay stable between renders.
- If every API response recreates all product objects, memoization will not save much.
- Backend pagination and debounced requests still matter more.

## Other Bugs That Affect Performance Or UX

### `Filter.jsx` uses `class` instead of `className`

File:

- `src/features/Product/Filter.jsx`

Current code uses:

```jsx
<aside class="w-full md:w-1/4 space-y-8">
```

Use:

```jsx
<aside className="w-full md:w-1/4 space-y-8">
```

### Product availability filter appears unused by backend

Files:

- `src/features/Product/ProductAvailability.jsx`
- `backend/utils/productQuery.js`

Frontend sends `availability`, but backend filter currently reads `category`, `search`, `minPrice`, and `maxPrice`. If availability is not handled, the UI can trigger requests without changing results.

### Product ID shape may be inconsistent

Files:

- `src/features/Product/ProductCard.jsx`
- Backend Mongo documents usually use `_id`
- Local `data.js` uses `id`

If API products use `_id`, then `navigate(`/products/${product.id}`)` can break or navigate to `undefined`.

Recommended target:

```jsx
const productId = product.id || product._id;
```

## Priority Fix Order

1. Debounce product search and price range updates.
2. Add real backend pagination and wire `totalPages/currentPage` through Redux.
3. Lazy-load and optimize product images.
4. Remove console logs from selectors/render paths.
5. Convert `selectFilteredOrders` to `createSelector`.
6. Remove duplicate Material Symbols font link.
7. Add `useCallback`, `useMemo`, and `React.memo` only around the hot paths above.

## Quick Performance Verdict

The app should feel fine with a small catalog. It will slow down when product/order data grows because the app currently over-fetches, re-renders grids after frequent URL changes, loads images eagerly, and recalculates order lists without memoized selectors. The best performance work is API/data-flow cleanup first, then targeted React memoization.
