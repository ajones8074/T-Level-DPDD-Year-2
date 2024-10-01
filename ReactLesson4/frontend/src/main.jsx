import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Root from "./routes/root"
import Site from './routes/site';
import Register from './routes/register';
import Login from './routes/login';
import Order from './routes/order';
import Orders from './routes/orders';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>
  },
  {
    path: "/site/:siteid",
    element: <Site/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/order/:orderid",
    element: <Order/>
  },
  {
    path: "/orders",
    element: <Orders/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)