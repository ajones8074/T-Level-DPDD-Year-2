import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Index from './routes';
import Login from './routes/login';
import Register from './routes/register';
import Sites from './routes/sites';
import Order from './routes/order';
import OrdersUser from './routes/ordersUser';
import OrdersSites from './routes/ordersSites';
import OrderStaff from './routes/orderStaff';
import Logout from './routes/logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index/>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/sites',
    element: <Sites />
  },
  {
    path: '/order/:orderid',
    element: <Order />
  },
  {
    path: '/orders/user/:userid',
    element: <OrdersUser/>
  },
  {
    path: '/orders/site',
    element: <OrdersSites/>
  },
  {
    path: '/orders/:orderid/staff',
    element: <OrderStaff/>
  },
  {
    path: '/logout',
    element: <Logout/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
