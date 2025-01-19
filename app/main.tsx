import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components';
import '../src/styles/main.css';
import './styles/base.css';

createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
