import { useQuery } from 'react-query';

import { getAllPosts } from '../api/posts';
import { QueryKey } from '../api/query-keys';
import { Post } from '../api/types';
import { queryClient } from '../components/query-cache-manager';

export const prefetchPosts = () => {
  const posts = queryClient.getQueryData(QueryKey.posts);
  if (!posts) {
    queryClient.prefetchQuery(QueryKey.posts, getAllPosts);
  }
};

export default function usePosts() {
  return useQuery<Post[], Error>(QueryKey.posts, getAllPosts);
}
