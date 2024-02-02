import React, { useContext, useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Home, AdminDash } from "./pages";
import { createBrowserRouter, RouterProvider, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/route/PrivateRoute";
import {authCxt} from "./components/context/Context";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

//const [authenticated, setAuthenticated] = useState(false)
// <React.StrictMode>
// <RouterProvider router={router} />
// </React.StrictMode>

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


{/* <div>
<authContext.Provider value={{'auth':true}}>
<Router>
  <Routes>
    <Route element={<PrivateRoute />}>
      <Route element={<AdminDash />} path="/admin" />
    </Route>
    <Route element={<Home />} path="/" />
  </Routes>
</Router>
</authContext.Provider>
</div> */}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
