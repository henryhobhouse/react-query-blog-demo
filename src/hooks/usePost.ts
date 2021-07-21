import { useQuery } from 'react-query';

import { getPostById } from '../api/posts';
import { QueryKey } from '../api/query-keys';
import { Post } from '../api/types';
import { queryClient } from '../components/query-cache-manager';

export const prefetchPost = (postId: string) => {
  const post = queryClient.getQueryData([QueryKey.posts, postId]);
  if (!post) {
    queryClient.prefetchQuery([QueryKey.posts, postId], () =>
      getPostById(postId)
    );
  }
};

export default function usePost(postId: string) {
  return useQuery<Post, Error>(
    [QueryKey.posts, postId],
    () => getPostById(postId),
    {
      placeholderData: () =>
        queryClient
          .getQueryData<Post[]>(QueryKey.posts)
          ?.find((post) => post.id === postId),
    }
  );
}
