import Link from 'next/link';
import React, { FC } from 'react';
import { Layout } from '../../src/components/layout';
import { Loader } from '../../src/components/styled';
import { PostForm, PostFormState } from '../../src/components/post-form';
import usePosts from '../../src/hooks/usePosts';
import useCreatePost from '../../src/hooks/useCreatePost';
import { Post } from '../../src/api/types';

const Admin: FC = () => {
  const postsQuery = usePosts();
  const { isError, isSuccess, isLoading, mutate: createPost } = useCreatePost();

  const onSubmit = async (values: PostFormState) => {
    await createPost(values, {
      onSuccess: () => postsQuery.refetch(),
    });
  };

  const getSubmitText = () => {
    if (isLoading) return 'Saving...';
    if (isError) return 'Error!';
    if (isSuccess) return 'Saved!';

    return 'Create Post';
  };

  return (
    <Layout>
      <section>
        <div>
          {postsQuery.isLoading && (
            <span>
              <Loader /> Loading
            </span>
          )}
          {postsQuery.isSuccess && !postsQuery.isLoading && (
            <>
              <h3>Posts</h3>
              <ul>
                {postsQuery.data.map((post: Post) => (
                  <li key={post.id}>
                    <Link
                      href={{
                        pathname: `/admin/[postId]`,
                        query: { postId: post.id },
                      }}
                    >
                      <a>{post.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
        <hr />
        <div>
          <h3>Create New Post</h3>
          <div>
            <PostForm
              loading={isLoading}
              onSubmit={onSubmit}
              clearOnSubmit
              submitText={getSubmitText()}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
