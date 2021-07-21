import { useMutation } from 'react-query';
import { queryClient } from '../../pages/_app';

import { deletePostById } from '../api/posts';
import { QueryKey } from '../api/query-keys';
import { Post } from '../api/types';

export default function useDeletePost() {
  return useMutation((postId: string) => deletePostById(postId), {
    onMutate: async (postId) => {
      // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(QueryKey.posts);

      // optimistically update the cache affected by this query
      const previousPosts = queryClient.getQueryData<Post[]>(QueryKey.posts);
      if (previousPosts) {
        const updatedPosts = previousPosts.filter((d) => d.id !== postId);
        queryClient.setQueryData(QueryKey.posts, updatedPosts);
      }

      return { previousPosts };
    },
    onError: (_err, _postId, { previousPosts }: any) => {
      if (previousPosts) {
        queryClient.setQueryData(QueryKey.posts, previousPosts);
      }
    },
    onSuccess: () => {
      // have all affected queries refetch silently in the background on update. We can have this
      // in only onSuccess for deletion mutations as the old state is effectively what we want (only change on success)
      queryClient.invalidateQueries(QueryKey.posts);
    },
  });
}
