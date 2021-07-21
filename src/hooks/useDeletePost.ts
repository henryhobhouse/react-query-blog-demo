import { useMutation } from 'react-query';
import { queryClient } from '../../pages/_app';

import { deletePostById } from '../api/posts';
import { Post } from '../api/types';

export default function useDeletePost() {
  return useMutation((postId: string) => deletePostById(postId), {
    onSuccess: (_, postId) => {
      // update the posts list cache to reflect that the post has been removed.
      const previousPosts = queryClient.getQueryData<Post[]>('posts');
      if (previousPosts) {
        const updatedPosts = previousPosts.filter((d) => d.id !== postId);
        queryClient.setQueryData('posts', updatedPosts);
      }

      // have all affected queries refetch silently in the background on update. We can have this
      // in only onSuccess for deletion mutations as the old state is effectively what we want (only change on success)
      queryClient.invalidateQueries('posts');
    },
  });
}
