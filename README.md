## What is this?

It's an example repo, forked from [react queries repo](https://github.com/tannerlinsley/react-query-blog-demo) and updated to fit the purpose of a workshop, that gives stepping stone exercises to go from a simple hook-based application to React Query, avoiding all of the "global state" madness that normally happens!

- The `main` branch contains the initial code we started with
- There are a number of branches that show example implementations for each exercise to review.
- The `final-query` branch shows all of them together.

## Exercises

- Convert the custom hooks used to fetch data to use `useQuery`
- Implement per-screen background fetching indicators
- Convert the custom hooks used to create/update/delete to use `useMutation`
- Configure mutations to automatically invalidate related queries
- Implement optimistic updates for mutations
- Prefetch individual posts on hover using `queryCache.prefetchQuery` (OR)
- Use `initialData` to show placeholder content for individual posts that pull from the parent `posts` query
- Remove per-screen background fetching indicators and instead build a global re-fetching indicator
- Dehydrate/hydrate the cache to and from localStorage using the `react-query/hydration` APIs

## How do I develop on this?

- Run `yarn` and then `yarn dev` locally.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- **NOTE:** The "database" used in this app is simply a JSON file and thus will not work as a deployed application. That said, you are more than welcome to hook it up to a real API if you want!

## Why Next.js (from the author of React Query but I mostly agree with him!)?

[Read This 😁](https://gist.github.com/tannerlinsley/65ac1f0175d79d19762cf06650707830)
