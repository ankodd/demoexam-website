import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
import Registration from "./components/auth/Registration.tsx";
import Login from "./components/auth/Login.tsx";
import AuthCart from "./pages/auth/AuthCart.tsx";
import './styles/index.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/registration",
    element: <AuthCart><Registration /></AuthCart>
  },
  {
    path: "/login",
    element: <AuthCart><Login /></AuthCart>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
