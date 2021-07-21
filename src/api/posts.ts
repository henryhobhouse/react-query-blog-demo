import axios from 'axios';
import { Post } from './types';

export const createNewPost = async (newPost: Omit<Post, 'id'>) =>
  axios.post('/api/posts', newPost);

export const getPostById = async (postId: string) =>
  axios.get(`/api/posts/${postId}`);

export const deletePostById = async (postId: string) =>
  axios.delete(`/api/posts/${postId}`);

export const getAllPosts = async () => axios.get('/api/posts');

export const updatePostById = async (post: Post) =>
  axios.patch(`/api/posts/${post.id}`, post);
