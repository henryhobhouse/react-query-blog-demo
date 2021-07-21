import { useMutation } from 'react-query';

import { updatePostById } from '../api/posts';
import { Post } from '../api/types';
import { queryClient } from '../../pages/_app';
import { QueryKey } from '../api/query-keys';

export default function useSavePost() {
  return useMutation<Post, Error, Post>((post) => updatePostById(post), {
    onMutate: async (updatedPost) => {
      // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(QueryKey.allPosts);

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(QueryKey.allPosts);
      const previousPost = queryClient.getQueryData([
        QueryKey.allPosts,
        updatedPost.id,
      ]);

      // handle all posts (as data is not normalised) within cache
      // NOTE: make an update then go to the exercises page. Notice the issue. Something to consider
      // when making optimistic updates!!
      queryClient.setQueryData<Post[]>(QueryKey.allPosts, (oldPosts) => {
        if (oldPosts) {
          const indexOfUpdatedPost = oldPosts.findIndex(
            (post) => post.id === updatedPost.id
          );
          oldPosts.splice(indexOfUpdatedPost, 1, updatedPost);
          return [...oldPosts];
        }
        return [];
      });

      // handle individual post update within cache
      queryClient.setQueryData(
        [QueryKey.allPosts, updatedPost.id],
        updatedPost
      );

      // Return a context object with the snap shotted value
      return { previousPosts, previousPost };
    },
    onError: (_err, _postId, { previousPosts, previousPost }: any) => {
      if (previousPosts) {
        queryClient.setQueryData(QueryKey.allPosts, previousPosts);
      }
      if (previousPost) {
        queryClient.setQueryData(
          [QueryKey.allPosts, previousPost.id],
          previousPost
        );
      }
    },
    onSettled: (_updatedPost, _error, args) => {
      // have all affected queries refetch silently in the background on update.
      queryClient.invalidateQueries(QueryKey.allPosts);
      queryClient.invalidateQueries([QueryKey.allPosts, args.id]);
    },
  });
}
