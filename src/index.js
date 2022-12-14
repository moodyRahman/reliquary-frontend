import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import Page from '@components/Page';
import { 
  Welcome, Login, Register, 
  Logout, Characters, Character, 
  Compendium, Spells } from "@routes/Routes"
import { OnlyUnauthRoutes, ProtectedRoutes } from './routes/ProtectedRoute';
import { PersistGate } from "redux-persist/integration/react"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Page />}>
      <Route path="/" element={<Welcome />} />
      <Route element={<OnlyUnauthRoutes />}>
        <Route path="login/" element={<Login />} />
        <Route path="register/" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoutes />}>

        <Route path="characters/">
          <Route path="" element={<Characters />} />
          <Route path=":id/" element={<Character />} />
        </Route>
        <Route path="campaigns/" element={<>campaigns !!</>} />
        <Route path="logout/" element={<Logout />} />
        <Route path="compendium/">
          <Route path="" element={<Compendium />} />
          <Route path="spells/" element={<Spells />} />

        </Route>
        <Route path="waluigi/" element={<>waaaaaaaa</>} />

      </Route>
    </Route>
  ))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<>:0</>}
        persistor={persistor}
      >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
