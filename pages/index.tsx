import React, { FC, useEffect } from 'react';
import Link from 'next/link';

import { Layout } from '../src/components/layout';
import { prefetchPosts } from '../src/hooks/usePosts';

const Home: FC = () => {
  useEffect(() => {
    prefetchPosts();
  }, []);

  return (
    <Layout>
      <section style={{ padding: '0 1rem 1rem 1rem' }}>
        <h1>Welcome!</h1>
        <p>
          This is the React Query workshop. Today we are going to convert this
          application from one that is using basic REST api handling to use
          React Query.
        </p>
        <p>
          To kick this off please click through to the exercises page{' '}
          <Link href="/exercises">here</Link> and look start from the first. You
          will also find branches within the repository with the same
          corresponding name. These branches have both a valid implementation of
          React query in addition to possible alternatives. Its important to
          note that this implementations are just for ideation and discussion.
          They are not setting a precedence.
        </p>
        <h3>Exercises to try:</h3>
        <ul>
          <li>
            <strong>Fetching data</strong> - Convert the custom hooks used to
            fetch data to use `useQuery`
          </li>

          <li>
            <strong>Typescript/Types</strong>
          </li>
          <li>
            <strong>Data mutation</strong> - Convert the custom hooks used to
            create/update/delete to use `useMutation`
          </li>
          <li>
            <strong>Handling related data</strong> - Manually call a function to
            fetch related data similar to the useLazyQuery/useLazyPromise
            pattern
          </li>
          <li>
            <strong>Handling related data V2</strong> - Configure mutations to
            automatically invalidate related queries
          </li>
          <li>
            <strong>Data mutation v2</strong> - Implement optimistic updates for
            mutations
          </li>
          <li>
            <strong>Predictive query fetching...</strong> - Prefetch individual
            posts on hover using `queryCache.prefetchQuery`
          </li>
          <li>
            <strong>Pre-populating queries</strong> - Use `initialData` to show
            placeholder content for individual posts that pull from the parent
            `posts` query
          </li>
          <li>
            <strong>Refetch loading</strong> - Background fetching indicators
          </li>
          <li>
            <strong>To Load or not too load...</strong> - Dehydrate/hydrate the
            cache to and from localStorage using the `react-query/hydration`
            APIs
          </li>
        </ul>

        <h3>Discussion points:</h3>

        <li>How to structure the code modules/directories?</li>
        <li>What underlying library to use to make the request?</li>
        <li>Mutation strategy and handling related data?</li>
        <li>
          Do we need a fetch on demand strategy (useLazyPromise/useLazyQuery
          pattern)?
        </li>

        <h4>React Query Documentation:</h4>
        <p>
          It is highly recommended to have a scan through the docs before
          starting the exercises.
        </p>
        <a href="https://react-query.tanstack.com/overview">
          https://react-query.tanstack.com/overview
        </a>
        <h4>React Query Examples:</h4>
        <a href="https://react-query.tanstack.com/examples/simple">
          https://react-query.tanstack.com/examples/simple
        </a>
        <h3>Repo/App architecture</h3>
        <p>
          The app is a basic &apos;blog&apos; setup that used fake API&apos;s to
          test your requests with. The database/persistent store that is the
          source is the <strong>store.json</strong> file at the root of the
          repo. The code within the <strong>db</strong> directory is acting as a
          form or very simple ODM to access this data. We use{' '}
          <a href="https://nextjs.org/docs/api-routes/introduction">
            Next JS&apos;s API middleware
          </a>{' '}
          to create the endpoints including artificially adding time for
          loading/retrieving the data.
        </p>
        <p>
          You can see the implementation for this in the{' '}
          <strong>/pages/api/**</strong> path in this repo. Saying that these
          details are not useful or required to know for this workshop. The only
          aspect that is required to be understood is the path to the endpoints.
          To make this easy we&apos;ve put all the requests used in a single
          module which can be found at <strong>/src/api/posts.ts</strong>
        </p>
      </section>
    </Layout>
  );
};

export default Home;
