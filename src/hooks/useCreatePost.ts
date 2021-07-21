import { useMutation } from 'react-query';
import { queryClient } from '../../pages/_app';
import { createNewPost } from '../api/posts';

import { Post } from '../api/types';

export default function useCreatePost() {
  return useMutation<Post, Error, Omit<Post, 'id'>, { previousPosts: Post[] }>(
    (newPost) => createNewPost(newPost),
    {
      onSuccess: async (newPostWithId) => {
        // add the newly created post to the posts list in the cache
        queryClient.setQueryData<Post[]>('posts', (oldPosts) => [
          ...(oldPosts ?? []),
          newPostWithId,
        ]);
      },
      onSettled: () => {
        // Always refetch after error or success. In this case important as the ID of the new post in the cache will be incorrect
        queryClient.invalidateQueries('posts');
      },
    }
  );
}
