import { useMutation } from 'react-query';

import { deletePostById } from '../api/posts';

export default function useDeletePost() {
  return useMutation((postId: string) => deletePostById(postId));
}
