import React from 'react';
import App from 'next/app';
import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

import { QueryCacheManager } from '../src/components/query-cache-manager';

const GlobalStyles = createGlobalStyle`
  ${normalize};
  html, body, body, [data-reactroot] {
    min-height: 100%;
    max-width: 100%;
  }

  html, body {
    width: 100%;
    font-size: 16px;
    font-family: "Helvetica", "Georgia", sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  input {
    max-width: 100%;
  }

  a {
    text-decoration: none;
    cursor: pointer;

    :hover { text-decoration: none; }
    :active { text-decoration: none; }
    :visited { text-decoration: none; }
    :link { text-decoration: none; }
  }

  p {
    margin-bottom: 1rem;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <QueryCacheManager>
        <GlobalStyles />
        <Component {...pageProps} />
      </QueryCacheManager>
    );
  }
}
