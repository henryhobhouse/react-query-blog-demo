import React, { useEffect, FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { ReactQueryDevtools } from 'react-query-devtools';

export const queryClient = new QueryClient();

export const QueryCacheManager: FC = ({ children }) => {
  useEffect(() => {
    const localStoragePersistor = createWebStoragePersistor({
      storage: window?.localStorage,
    });

    persistQueryClient({
      queryClient,
      persistor: localStoragePersistor,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
