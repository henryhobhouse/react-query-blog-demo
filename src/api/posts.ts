import axios, { AxiosResponse } from 'axios';
import { Post } from './types';

export const createNewPost = async (newPost: Omit<Post, 'id'>) => {
  const { data } = await axios.post<Omit<Post, 'id'>, AxiosResponse<Post>>(
    '/api/posts',
    newPost
  );
  return data;
};

export const getPostById = async (postId: string) => {
  const { data } = await axios.get<Post>(`/api/posts/${postId}`);
  return data;
};

export const deletePostById = async (postId: string) =>
  axios.delete<Post>(`/api/posts/${postId}`);

export const getAllPosts = async () => {
  const { data } = await axios.get<Post[]>('/api/posts');
  return data;
};

export const updatePostById = async (post: Post) => {
  const { data } = await axios.patch<Post>(`/api/posts/${post.id}`, post);
  return data;
};
