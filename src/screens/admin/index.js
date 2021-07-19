import React from 'react';
import Link from 'next/link';
import PostForm from '../../components/post-form';
import { Loader } from '../../components/styled';
import usePosts from '../../hooks/usePosts';
import useCreatePost from '../../hooks/useCreatePost';

export default function Admin() {
  const postsQuery = usePosts();
  const [createPost, createPostInfo] = useCreatePost();

  const onSubmit = async (values) => {
    await createPost(values);
    postsQuery.fetch();
  };

  return (
    <section>
      <div>
        <div>
          {postsQuery.isLoading ? (
            <span>
              <Loader /> Loading
            </span>
          ) : (
            <>
              <h3>Posts</h3>
              <ul>
                {postsQuery.data.map((post) => (
                  <li key={post.id}>
                    <Link href={{
                        pathname: `/admin/[adminId]`,
                        query: { adminId: post.id },
                    }}>
                    {post.title}</Link>
                  </li>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>
      <hr />
      <div>
        <h3>Create New Post</h3>
        <div>
          <PostForm
            onSubmit={onSubmit}
            clearOnSubmit
            submitText={
              createPostInfo.isLoading
                ? 'Saving...'
                : createPostInfo.isError
                ? 'Error!'
                : createPostInfo.isSuccess
                ? 'Saved!'
                : 'Create Post'
            }
          />
        </div>
      </div>
    </section>
  );
}
