import { useMutation } from 'react-query';

import { updatePostById } from '../api/posts';
import { Post } from '../api/types';

export default function useSavePost() {
  return useMutation((post: Post) => updatePostById(post));
}
