import { useContext, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import AppContext from "../utils/AppContext";
import serverURL from "../utils/urls";
import { applyDarkMapStyles, removeDarkMapStyles } from "../utils/map";

export default function useAuth() {
  const { authUser, isLoggedIn, setIsLoggedIn, setAuthUser, theme } =
    useContext(AppContext);

  useEffect(() => {
    const getAuthDetails = async () => {
      const authToken = Cookies.get("authToken");
      if (authToken) {
        try {
          const {
            data: { data },
          } = await axios.get(`${serverURL}/auth/authenticate`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setAuthUser(data);
          setIsLoggedIn(true);
        } catch (error) {
          setAuthUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setAuthUser(null);
        setIsLoggedIn(false);
      }
    };

    if (theme === "dark") {
      applyDarkMapStyles();
    } else {
      removeDarkMapStyles();
    }
    getAuthDetails();
  }, [setAuthUser, setIsLoggedIn, theme]);

  return { authUser, isLoggedIn };
}
