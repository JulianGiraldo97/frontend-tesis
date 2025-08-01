import { css } from '@emotion/react';

export const skipLinkStyles = {
  skipLink: css`
    position: absolute;
    top: -40px;
    left: 6px;
    background: #2A7F62;
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    
    &:focus {
      top: 6px;
    }
  `,
}; 