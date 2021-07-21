import { useQuery } from 'react-query';

import { getAllPosts } from '../api/posts';
import { QueryKey } from '../api/query-keys';
import { Post } from '../api/types';

export default function usePosts() {
  return useQuery<Post[], Error>(QueryKey.posts, getAllPosts);
}
