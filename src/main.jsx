import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from 'routes/Router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'css/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
