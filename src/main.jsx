import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './Components/Layout/Home.jsx';
import Shop from './Components/Shop/Shop.jsx';
import Orders from './Components/Orders/Orders.jsx';
import Inventory from './Components/Inventory/Inventory.jsx';
import Login from './Components/Login/Login.jsx';
import cartProductsLoader from './Components/Loader/cartPorductsLoader';
import SignUp from './Components/SignUp/SignUp';
import AuthProvider from './Components/providers/AuthProvider';
import PrivateRoute from './Components/routes/PrivateRoute';
import Checkout from './Components/Checkout/Checkout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
        loader: () => fetch('http://localhost:5000/totalProducts')
      },
      {
        path: 'orders',
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: 'checkout',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
      },
      {
        path: 'inventory',
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'sign-up',
        element: <SignUp></SignUp>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
      <RouterProvider router={router} />
     </AuthProvider>
  </React.StrictMode>,
)
