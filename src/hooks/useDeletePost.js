import React from 'react';

import { deletePostById } from '../api/posts';

export default function useDeletePost() {
  const [state, setState] = React.useReducer((_, action) => action, {
    isIdle: true,
  });

  const mutate = React.useCallback(async (postId) => {
    setState({ isLoading: true });
    try {
      const { data } = await deletePostById(postId);
      setState({ isSuccess: true });
    } catch (error) {
      setState({ isError: true, error });
    }
  }, []);

  return [mutate, state];
}
