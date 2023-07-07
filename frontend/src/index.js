import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Inventory from './Pages/Inventory/Inventory';
import LandingPage from './Pages/Landing/LandingPage';
import EditInventory from './Pages/Inventory/EditInventory';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/Todos",
    element: <LandingPage/>,
  },
  {
    path: "/inventory",
    element: <Inventory/>,
  },
  {
    path: "/inventory/edit/:editId",
    element: <EditInventory/>,
  },
  
  {
    path: "/Branches",
    element: <Inventory/>,
  },
  {
    path: "/Branch",
    element: <Inventory/>,
  },
  {
    path: "/Branch/Inventory",
    element: <Inventory/>,
  },
  {
    path: "/Branch/Finances",
    element: <Inventory/>,
  },
  {
    path: "/Branch/Hr",
    element: <Inventory/>,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
