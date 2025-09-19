import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './store/index';
import React, { Suspense } from 'react';
import {
  NotFoundPage,
  ProtectedRoute,
  LoadingSkeleton,
  AdminViewLayout,
  ProductLayout,
  CartLayout,
  FavouriteLayout,
} from './components/allFiles';

// Lazy imports
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Register = React.lazy(() => import('./pages/Auth/Register'));
const AuthLayout = React.lazy(() => import('./components/auth/AuthLayout'));
const AdminProducts = React.lazy(() => import('./pages/admin/AdminProducts'));
const Home = React.lazy(() => import('./pages/shop/Home'));
const ProductCategory = React.lazy(() => import('./pages/shop/ProductCategory'));
const Explore = React.lazy(() => import('./pages/shop/Explore'));
const ProductView = React.lazy(() => import('./pages/shop/ProductView'));
const Cart = React.lazy(() => import('./pages/shop/Cart'));
const Favourite=React.lazy(()=>import('@/pages/shop/Favourite'))
const Profile=React.lazy(()=>import('@/pages/userView/Profile'))
const Orders=React.lazy(()=>import('@/pages/admin/Orders'))
const Checkout=React.lazy(()=>import('@/pages/shop/Checkout'))
const OrderConfirmationPage=React.lazy(()=>import('@/pages/shop/OrderConfirmationPage'))

// Router setup
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      // user
      {
        path: 'user',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'profile', element:<ProtectedRoute><Profile /></ProtectedRoute> },

        ]
      },
      // admin
      {
        path: 'admin',
        element: <AdminViewLayout />,
        children: [
          {
            path: 'products',
            element: (
              <ProtectedRoute requiredRole="admin">
                <AdminProducts />
              </ProtectedRoute>
            )
          },
          {
            path: 'orders',
            element: (
              <ProtectedRoute requiredRole="admin">
                <Orders />
              </ProtectedRoute>
            )
          }
        ]
      },
      // product
      {
        path: 'products',
        element: <ProductLayout />,
        children: [
          { path: 'category', element: <ProductCategory /> },
          { path: 'explore', element: <Explore /> },
          {path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
        ]
      },
      // product view
      { path: 'product/:id', element:<ProductView /> }, 
      // order
      {
        path: 'order/verify-order',
        element: <ProtectedRoute ><OrderConfirmationPage/></ProtectedRoute>
      },
      // cart
      {
        path: 'cart',
        element: <CartLayout />,
        children: [
          { path: ':userId', element: <ProtectedRoute><Cart/></ProtectedRoute> } 
        ]
      },
      // favourite
      {
        path: 'favourite',
        element: <FavouriteLayout />,
        children: [
          { path: ':userId', element: <ProtectedRoute><Favourite/></ProtectedRoute> } 
        ]
      },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={<LoadingSkeleton />}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);