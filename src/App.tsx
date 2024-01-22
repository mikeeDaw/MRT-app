import React, { useContext, useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Home, AdminDash } from "./pages";
import { createBrowserRouter, RouterProvider, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/route/PrivateRoute";
import "./App.css";
import authCxt from "./components/context/AuthContext";

function App() {

  console.log('in app')

  return (
    <div>
      {/* <authCxt.Provider value={{auth: autho, setAuth: setAutho}}> */}
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<AdminDash />} path="/admin" />
          </Route>
          <Route element={<Home />} path="/" />
        </Routes>
      </Router>
      {/* </authCxt.Provider> */}
    </div>
  );
}

export default App;
