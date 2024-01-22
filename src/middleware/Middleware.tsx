import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authCxt from "../components/context/AuthContext";

const TOKEN_KEY = 'MRT-SESH';

export const isLogged = () => (localStorage.getItem(TOKEN_KEY) ? true : false)

export const Middleware = () => {
 
  const nav = useNavigate()
  

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const {auth, setAuth} = useContext(authCxt);

  useEffect(() => {

      const sessionToken = localStorage.getItem(TOKEN_KEY) ?? '';
      console.log('Middleware')
      if (sessionToken) {
          try {   // Validate session token
              const decoded = jwtDecode(sessionToken);

              // Check token expiration (assuming token contains 'exp' claim)
              const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
              if (decoded.exp && decoded.exp < currentTimestamp) {
                  localStorage.clear()
                  console.log('if on try')
                  setIsTokenExpired(true); // Set the state variable when the token is expired
                  nav('/'); // Redirect to login page if the token has expired
                  return;
              } else {
                  setIsTokenValid(true);
              }

          } catch (error) {
              localStorage.clear()
              console.log('if on catch')
              setIsTokenInvalid(true); // Set the state variable if the token is not valid
              nav('/'); // Redirect to login page if the token is not valid
          }
      } else {
        console.log('if on outer if')
        localStorage.clear(); //if user is not logged in or no token is present
        nav('/');
        
      }
  }, [nav, TOKEN_KEY]);

    const login = (token : string) => {
      localStorage.setItem(TOKEN_KEY, token);
      nav('/admin');
    }
    
    const logout = () => {
      localStorage.removeItem(TOKEN_KEY);
      setAuth(false)
      nav('/');
    }

    const getToken = () => {
      const token = localStorage.getItem(TOKEN_KEY);
      return `Bearer ${token}`
    }


  return { login, logout, getToken }
}

export default {Middleware, isLogged}

