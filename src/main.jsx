import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { GlobalStyle } from './GlobalStyle.jsx';
import { FilterProvider } from './context/FiltersContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FilterProvider>
        <GlobalStyle />
        <App />
      </FilterProvider>
    </BrowserRouter>
  </StrictMode>
);
