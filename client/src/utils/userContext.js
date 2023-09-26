import { createContext, useContext, useState } from "react";

const userContext = createContext();

export const useUserContext = () => useContext(userContext);

export const UsernameProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const setUsername = (username) => {
    setUser(username);
  };

  const getUsername = () => {
    return user;
  };

  return (
    <userContext.Provider value={{ setUsername, getUsername }}>
      {children}
    </userContext.Provider>
  );
};
