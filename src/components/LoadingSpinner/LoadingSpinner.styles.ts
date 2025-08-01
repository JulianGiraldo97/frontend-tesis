import { css } from '@emotion/react';

export const loadingSpinnerStyles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  `,
  
  spinner: (size: 'small' | 'medium' | 'large') => css`
    border: 4px solid #e5e7eb;
    border-top: 4px solid #2A7F62;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    ${size === 'small' && 'width: 1rem; height: 1rem;'}
    ${size === 'medium' && 'width: 2rem; height: 2rem;'}
    ${size === 'large' && 'width: 3rem; height: 3rem;'}
  `,
  
  text: css`
    margin-top: 1rem;
    color: #6b7280;
    font-weight: 500;
  `,
  
  srOnly: css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `,
}; 