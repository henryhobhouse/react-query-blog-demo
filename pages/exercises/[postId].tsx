import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout } from '../../src/components/layout';
import usePost from '../../src/hooks/usePost';
import { Loader } from '../../src/components/styled';
import { getFirstInstanceOfQuery } from '../../src/utils/url-query';
import { prefetchPosts } from '../../src/hooks/usePosts';

const Post: FC = () => {
  const { query } = useRouter();
  const postId = getFirstInstanceOfQuery(query.postId);
  const postQuery = usePost(postId);

  useEffect(() => {
    prefetchPosts();
  }, []);

  if (postQuery.isError) return <Layout>{postQuery.error.message}</Layout>;

  return (
    <Layout>
      {postQuery.isLoading && (
        <span>
          <Loader /> Loading...
        </span>
      )}
      {postQuery.isSuccess && !postQuery.isLoading && (
        <div>
          <h2>{postQuery.data.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: postQuery.data.body }} />
        </div>
      )}
    </Layout>
  );
};

export default Post;
