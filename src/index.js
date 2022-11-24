import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'
import Page from '@components/Page';
import { Welcome, Login, Register } from "@routes/Routes"
import { OnlyUnauthRoutes, ProtectedRoute, ProtectedRoutes } from './routes/ProtectedRoute';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Page />,
//     children: [
//       { index: true, element: <Welcome /> },
//       {
//         path: "login",
//         element: <ProtectedRoute authRequired={false} children={<Login />} />,
//       },
//       {
//         path: "register",
//         element: <ProtectedRoute authRequired={false} children={<Register />} />,
//       },
//       {
//         path:"characters",
//         element: <ProtectedRoute authRequired={true} children={<>characters page</>} />
//       }
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Page />}>
      <Route path="/" element={<Welcome />} />
      <Route element={<OnlyUnauthRoutes />}>
        <Route path="login/" element={<Login />} />
        <Route path="register/" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="characters/" element={<>characters !!</>} />
        <Route path="campaigns/" element={<>campaigns !!</>} />
      </Route>
    </Route>
  ))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
