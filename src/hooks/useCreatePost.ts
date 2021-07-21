import { useMutation } from 'react-query';
import { queryClient } from '../../pages/_app';
import { createNewPost } from '../api/posts';
import { QueryKey } from '../api/query-keys';

import { Post } from '../api/types';
import { queryClient } from '../components/query-cache-manager';

export default function useCreatePost() {
  return useMutation<Post, Error, Omit<Post, 'id'>>(
    (newPost) => createNewPost(newPost),
    {
      onMutate: async (newPostWithoutId) => {
        // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(QueryKey.posts);

        // Snapshot the previous value
        const previousPosts = queryClient.getQueryData<Post[]>(QueryKey.posts);

        // add the newly created post to the posts list in the cache
        queryClient.setQueryData<Post[]>(QueryKey.posts, (oldPosts) => [
          ...(oldPosts ?? []),
          { id: Date.now().toString(), isPreview: true, ...newPostWithoutId },
        ]);

        return { previousPosts };
      },
      onError: (_err, _newPost, context: any) => {
        if (context?.previousPosts) {
          queryClient.setQueryData<Post[]>(
            QueryKey.posts,
            context.previousPosts
          );
        }
      },
      onSettled: () => {
        // Always refetch after error or success. In this case important as the ID of the new post in the cache will be incorrect
        queryClient.refetchQueries(QueryKey.posts);
      },
    }
  );
}
