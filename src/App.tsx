import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/route/PrivateRoute";
import "./index.css";
import { AdminDash, Home } from "./pages";
import Error from "./pages/Error";

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
