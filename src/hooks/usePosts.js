import { useQuery } from 'react-query';

import { getAllPosts } from '../api/posts';

export default function usePosts() {
  return useQuery('posts', getAllPosts);
}
