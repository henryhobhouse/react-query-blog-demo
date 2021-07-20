import { useQuery } from 'react-query';

import { getAllPosts } from '../api/posts';
import { Post } from '../api/types';

export default function usePosts() {
  return useQuery<Post[], Error>('posts', getAllPosts);
}
