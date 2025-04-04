import { createGlobalStyle } from 'styled-components';
import 'modern-normalize';

export const GlobalStyle = createGlobalStyle`


* {
    padding: 0px;
    margin: 0px;
    border: 0px;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

*::before,
*::after {
    display: inline-block;
}

:focus,
:active {
    // outline: none;
}

a:focus,
a:active {
    // outline: none;
}

html,
body {
    height: 100%;
    min-width: $minWidth + px;
}

body {
    background-color: black;
    color: white;
    line-height: 1;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

:root {
  /* --gray-900: #1a202c;
  --gray-800: #2d3748;
  --gray-700: #4a5568;

  --text-decoration-color: var(--gray-400);
  --text-color: var(--gray-800);
  --focus-ring-color: var(--blue-500); */
}

input,
button,
textarea {
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    background-color: transparent;
}

input,
textarea {
    width: 100%;
}

label {
    display: inline-block;
}

button,
select,
option {
    cursor: pointer;
}

a {
    display: inline-block;
    color: inherit;
    text-decoration: none;
}

ul li {
    list-style: none;
}

img {
    vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: inherit;
    font-size: inherit;
}
`;
