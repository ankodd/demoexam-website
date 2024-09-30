import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import App from './App.tsx'
import Login from "./components/auth/Login.tsx"
import Registration from "./components/auth/Registration.tsx"
import CreateOrder from './pages/orders/orders-create/CreateOrder.tsx'
import Orders from './pages/orders/Orders.tsx'
import Profile from "./pages/profile/Profile.tsx"
import './styles/index.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/registration",
    element: <Registration />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/orders",
    element: <Orders />
  },
  {
    path: "/orders/create",
    element: <CreateOrder />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
