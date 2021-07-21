import { useQuery } from 'react-query';

import { getPostById } from '../api/posts';
import { Post } from '../api/types';

export default function usePost(postId: string) {
  return useQuery<Post, Error>(['posts', postId], () => getPostById(postId));
}
