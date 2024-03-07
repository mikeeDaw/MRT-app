import React, { useContext, useState, createContext, useEffect } from "react";
import "./index.css";
import { Home, AdminDash } from "./pages";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/route/PrivateRoute";
import Error from "./pages/Error";
import "./App.css";
import { authCxt, TapMethod } from "./components/context/Context";

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
          <Route path="/:station/:pass" element={<Home />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
      {/* </TapMethod.Provider> */}
    </div>
  );
}

export default App;
