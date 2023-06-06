import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { store } from "./store";
import App from './App.tsx'
import './index.css'
import Repositories from "./pages/Repositories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
      path: "/repositories",
      element: <Repositories />
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>
)
