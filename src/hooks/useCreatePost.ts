import { useMutation } from 'react-query';
import { createNewPost } from '../api/posts';

import { Post } from '../api/types';

export default function useCreatePost() {
  return useMutation((newPost: Omit<Post, 'id'>) => createNewPost(newPost));
}
