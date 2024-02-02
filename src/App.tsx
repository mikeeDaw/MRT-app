import React, { useContext, useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Home, AdminDash } from "./pages";
import { createBrowserRouter, RouterProvider, Routes, Route, BrowserRouter as Router, useParams } from "react-router-dom";
import PrivateRoute from "./components/route/PrivateRoute";
import Error from "./pages/Error";
import "./App.css";
import {authCxt, TapMethod} from "./components/context/Context";

function App() {


  return (
    <div>
      {/* <TapMethod.Provider value={{currStation: "", pass: ""}}> */}
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<AdminDash />} path="/admin" />
          </Route>
          {/* <Route element={<Home />} path="/" /> */}
          <Route path="/:station/:pass" element={<Home />}/>
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
      {/* </TapMethod.Provider> */}
    </div>
  );
}

export default App;
