import { useQuery } from 'react-query';

import { getAllPosts } from '../api/posts';
import { Post } from '../api/types';

export default function useLazyPosts() {
  return useQuery<Post[], Error>('lazyPosts', getAllPosts, {
    enabled: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
