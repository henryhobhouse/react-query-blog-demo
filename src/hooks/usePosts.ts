import { useQuery } from 'react-query';
import { queryClient } from '../../pages/_app';

import { getAllPosts } from '../api/posts';
import { QueryKey } from '../api/query-keys';
import { Post } from '../api/types';

export const prefetchPosts = () => {
  const posts = queryClient.getQueryData(QueryKey.posts);
  if (!posts) {
    queryClient.prefetchQuery(QueryKey.posts, getAllPosts);
  }
};

export default function usePosts() {
  return useQuery<Post[], Error>(QueryKey.posts, getAllPosts);
}
