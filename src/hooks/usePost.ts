import { useQuery } from 'react-query';

import { getPostById } from '../api/posts';
import { QueryKey } from '../api/query-keys';
import { Post } from '../api/types';

export default function usePost(postId: string) {
  return useQuery<Post, Error>([QueryKey.allPosts, postId], () =>
    getPostById(postId)
  );
}
