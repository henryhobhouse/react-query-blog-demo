import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Layout } from '../../src/components/layout';
import usePost from '../../src/hooks/usePost';
import useSavePost from '../../src/hooks/useSavePost';
import useDeletePost from '../../src/hooks/useDeletePost';
import { Loader } from '../../src/components/styled';
import { PostForm, PostFormState } from '../../src/components/post-form';
import { Post } from '../../src/api/types';
import { getFirstInstanceOfQuery } from '../../src/utils/url-query';

const AdminPost: FC = () => {
  const { query, push } = useRouter();
  const postId = getFirstInstanceOfQuery(query.postId);
  const postQuery = usePost(postId);
  const {
    isLoading: savePostLoading,
    isError: savePostError,
    isSuccess: savePostSuccess,
    mutate: savePost,
  } = useSavePost();
  const {
    isLoading: deletePostLoading,
    isError: deletePostError,
    isSuccess: deletePostSuccess,
    mutate: deletePost,
  } = useDeletePost();

  const onSubmit = async (post: PostFormState) => {
    if (!post.id) {
      console.error('save post was submitted with data with not postId');
      return;
    }

    await savePost(post as Post, {
      onSuccess: () => postQuery.refetch(),
    });
  };

  const getSubmitButtonText = () => {
    if (savePostLoading) return 'Saving...';
    if (savePostError) return 'Error!';
    if (savePostSuccess) return 'Saved!';

    return 'Save Post';
  };

  const getDeleteButtonText = () => {
    if (deletePostLoading) return 'Deleting...';
    if (deletePostError) return 'Error!';
    if (deletePostSuccess) return 'Deleted!';

    return 'Delete Post';
  };

  const onDelete = async () => {
    const postId = getFirstInstanceOfQuery(query.postId);
    await deletePost(postId, {
      onSuccess: () => postQuery.refetch(),
    });
    push('/admin');
  };

  return (
    <Layout>
      {postQuery.isLoading && (
        <span>
          <Loader /> Loading...
        </span>
      )}
      {postQuery.isSuccess && !postQuery.isLoading && (
        <div>
          <h3>{postQuery.data.title}</h3>
          <p>
            <Link
              href={{
                pathname: `/exercises/[postId]`,
                query: { postId: postQuery.data.id },
              }}
            >
              <a>View Post</a>
            </Link>
          </p>
          <PostForm
            loading={deletePostLoading}
            initialValues={postQuery.data}
            onSubmit={onSubmit}
            submitText={getSubmitButtonText()}
          />

          <p>
            <button onClick={onDelete}>{getDeleteButtonText()}</button>
          </p>
        </div>
      )}
    </Layout>
  );
};

export default AdminPost;
