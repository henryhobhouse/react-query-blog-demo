import { useMutation } from 'react-query';

import { updatePostById } from '../api/posts';
import { Post } from '../api/types';
import { queryClient } from '../../pages/_app';

export default function useSavePost() {
  return useMutation<Post, Error, Post>((post) => updatePostById(post), {
    onSuccess: (updatedPost) => {
      // handle all posts (as data is not normalised) within cache
      queryClient.setQueryData<Post[]>('posts', (oldPosts) => {
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
      queryClient.setQueryData(['posts', { id: updatedPost.id }], updatedPost);
    },
    onSettled: (_updatedPost, _error, args) => {
      // have all affected queries refetch silently in the background on update.
      queryClient.invalidateQueries('posts');
      queryClient.invalidateQueries(['posts', args.id]);
    },
  });
}
