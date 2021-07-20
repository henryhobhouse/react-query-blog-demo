import React from 'react';

import { getPostById } from '../api/posts';

export default function usePost(postId) {
  const [state, setState] = React.useReducer((_, action) => action, {
    isLoading: true,
  });

  const fetch = React.useCallback(async () => {
    setState({ isLoading: true });
    try {
      const { data } = await getPostById(postId);
      setState({ isSuccess: true, data });
    } catch (error) {
      setState({ isError: true, error });
    }
  }, [postId]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    ...state,
    fetch,
  };
}
