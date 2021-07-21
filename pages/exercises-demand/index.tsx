import React, { FC } from 'react';
import { Post } from '../../src/api/types';
import { Layout } from '../../src/components/layout';
import { Loader, PostStyles } from '../../src/components/styled';
import useLazyPosts from '../../src/hooks/useLazyPosts';

const ExercisePosts: FC = () => {
  const {
    data,
    isLoading,
    isSuccess,
    refetch: fetchPosts,
    isError,
    error,
  } = useLazyPosts();

  if (isError) return <Layout>{error?.message}</Layout>;

  const ButtonTitle = () => {
    if (isLoading) return 'Loading...!';
    if (data) return 'Refetch Exercises';

    return 'Fetch Exercises';
  };

  return (
    <Layout>
      <div>
        <h1>Exercises on demand...</h1>

        <button onClick={() => fetchPosts()}>{ButtonTitle()}</button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '1rem',
          }}
        >
          {isLoading && (
            <span>
              <Loader /> Loading...
            </span>
          )}
          {!isLoading &&
            isSuccess &&
            data?.map((post: Post) => (
              <PostStyles key={post.id}>
                <h3>{post.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: post.body }} />
              </PostStyles>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ExercisePosts;
