import Link from 'next/link';
import React, { FC } from 'react';
import { Post } from '../../src/api/types';
import { Layout } from '../../src/components/layout';
import { Loader, PostStyles } from '../../src/components/styled';
import usePosts from '../../src/hooks/usePosts';

const ExercisePosts: FC = () => {
  const postsQuery = usePosts();

  if (postsQuery.isError) return <Layout>{postsQuery.error.message}</Layout>;

  return (
    <Layout>
      <div>
        <h1>Exercises</h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '1rem',
          }}
        >
          {postsQuery.isLoading && (
            <span>
              <Loader /> Loading...
            </span>
          )}
          {!postsQuery.isLoading &&
            postsQuery.isSuccess &&
            postsQuery.data.map((post: Post) => (
              <Link
                href={{
                  pathname: `/exercises/[postId]`,
                  query: { postId: post.id },
                }}
                key={post.id}
                passHref
              >
                <PostStyles>
                  <h3>{post.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: post.body }} />
                </PostStyles>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ExercisePosts;
