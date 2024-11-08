import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authCxt } from "../components/context/Context";

const TOKEN_KEY = "MRT-SESH";

export const isLogged = () => (localStorage.getItem(TOKEN_KEY) ? true : false);

export const Middleware = (station?: string, pass?: string) => {
  const nav = useNavigate();

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { auth, setAuth } = useContext(authCxt);

  useEffect(() => {
    const sessionToken = localStorage.getItem(TOKEN_KEY) ?? "";
    if (sessionToken) {
      try {
        // Validate session token
        const decoded = jwtDecode(sessionToken);

        // Check token expiration (assuming token contains 'exp' claim)
        const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
        if (decoded.exp && decoded.exp < currentTimestamp) {
          localStorage.clear();
          console.log("if on try");
          setIsTokenExpired(true); // Set the state variable when the token is expired
          nav(`/${station ?? "ayala"}/${pass ?? "in"}`); // Redirect to login page if the token has expired
          return;
        } else {
          setIsTokenValid(true);
        }
      } catch (error) {
        localStorage.clear();
        console.log("if on catch");
        setIsTokenInvalid(true); // Set the state variable if the token is not valid
        nav(`/${station ?? "ayala"}/${pass ?? "in"}`); // Redirect to login page if the token is not valid
      }
    } else {
      localStorage.clear(); //if user is not logged in or no token is present
      nav(`/${station ?? "ayala"}/${pass ?? "in"}`);
    }
  }, [nav, TOKEN_KEY]);

  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    nav("/admin");
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuth(false);
    nav(`/${station ?? "ayala"}/${pass ?? "in"}`);
  };

  const getToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return `Bearer ${token}`;
  };

  return { login, logout, getToken };
};

export default { Middleware, isLogged };
