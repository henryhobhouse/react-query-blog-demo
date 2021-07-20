import React from 'react';
import axios from 'axios';
import { deletePostById } from '../api/posts';

export default function useDeletePost() {
  const [state, setState] = React.useReducer((_, action) => action, {
    isIdle: true,
  });

  const mutate = React.useCallback(async (postId) => {
    setState({ isLoading: true });
    try {
      const { data } = await updatePosts(values);
      setState({ isSuccess: true });
    } catch (error) {
      setState({ isError: true, error });
    }
  }, []);

  return [mutate, state];
}
