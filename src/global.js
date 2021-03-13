// https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/

// these are global styled for the entire app. We can use theme and use variables we store there

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  a {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: none;
  }
  `
