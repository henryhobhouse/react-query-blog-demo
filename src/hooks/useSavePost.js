import React from 'react';
import { updatePostById } from '../api/posts';

export default function useSavePost() {
  const [state, setState] = React.useReducer((_, action) => action, {
    isIdle: true,
  });

  const mutate = React.useCallback(async (postId) => {
    setState({ isLoading: true });
    try {
      const { data } = await updatePostById(postId);
      setState({ isSuccess: true, data });
    } catch (error) {
      setState({ isError: true, error });
    }
  }, []);

  return [mutate, state];
}
