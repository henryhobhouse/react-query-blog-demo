import axios from 'axios';

export const updateAllPosts = async (allPosts) =>
  axios.post('/api/posts', allPosts);

export const getPostById = async (postId) => axios.get(`/api/posts/${postId}`);

export const deletePostById = async (postId) =>
  axios.delete(`/api/posts/${postId}`);

export const getAllPosts = async () => axios.get('/api/posts');

export const updatePostById = async (post) =>
  axios.patch(`/api/posts/${post.id}`, post);
