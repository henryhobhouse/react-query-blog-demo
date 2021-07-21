import React, { FC } from 'react';
import Sidebar from './sidebar';
import { Wrapper, Content } from './styled';
import { useIsFetching } from 'react-query';
import GlobalLoader from './global-loader';

export const Layout: FC = ({ children }) => {
  const isFetching = useIsFetching();
  return (
    <Wrapper>
      <Sidebar />
      <Content>{children}</Content>
      {!!isFetching && <GlobalLoader />}
    </Wrapper>
  );
};
