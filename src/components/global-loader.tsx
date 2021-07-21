import React from 'react';
import { Loader } from './styled';

export default function GlobalLoader() {
  return (
    <Loader
      style={{
        opacity: '1',
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        fontSize: '1.5rem',
        transition: '0.3s ease',
      }}
    />
  );
}
