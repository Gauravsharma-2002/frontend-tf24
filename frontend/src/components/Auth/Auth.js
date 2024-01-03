import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isUserLoggedIn: false,
  userRole: "",
  login: (user) => {},
  logout: () => {},
  userId: "",
});
let resetLogOutTimer;
export const AuthContextProvider = (props) => {
  const localToken = localStorage.getItem("jwtToken");
  const localUserDate = localStorage.getItem("expiryDate");
  const localUserRole = localStorage.getItem("userRole");
  const localUserId = localStorage.getItem("userId");

  const [token, setToken] = useState(localToken);
  const [userRole, setUserRole] = useState(localUserRole);
  const [userId, setUserId] = useState(localUserId);
  // const [expiryDate,setExpiryDate] = useState(localUserDate);

  let userLoggedIn = !!token;

  const logOutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userRole");
    localStorage.removeItem("jwtToken");
    setToken(null);
    if (resetLogOutTimer) clearTimeout(resetLogOutTimer);
  };

  const calculateRemainingTime = (expiryDate) => {
    const currentTime = new Date().getTime();
    const adjExpiryDate = new Date(expiryDate).getTime();
    const remainingTime = adjExpiryDate - currentTime;
    return remainingTime;
  };

  const loginHandler = (user) => {
    localStorage.setItem("jwtToken", user.token);
    localStorage.setItem("userId", user.userId);
    localStorage.setItem("userRole", user.userRole);
    const remainingMSeconds = 5 * 24 * 60 * 60 * 100;
    const expiryDate = new Date(new Date().getTime() + remainingMSeconds);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
    setToken(user.token);
    setUserId(user.userId);
    setUserRole(user.userRole);
    userLoggedIn = true;
    const remainingTime = calculateRemainingTime(expiryDate);
    resetLogOutTimer = setTimeout(logOutHandler, remainingTime);
  };

  const AuthContextValue = {
    token: token,
    isUserLoggedIn: userLoggedIn,
    userRole: userRole,
    userId: userId,
    login: loginHandler,
    logout: logOutHandler,
  };

  return<AuthContext.Provider value={AuthContextValue}>
    {props.children}
  </AuthContext.Provider>
  
};

export default AuthContext;
