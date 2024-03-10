import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<<<<<<< HEAD


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
=======
import { BrowserRouter } from 'react-router-dom';
import { Helmet,HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <Helmet>
      <title>電磁波シュミレーション</title>
      <meta name="description" content="誰でも、簡単に電磁波シュミレーション" />
    </Helmet>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
>>>>>>> b1d7be79716fd5cd30330465c1e0ac7664171dd5
);
