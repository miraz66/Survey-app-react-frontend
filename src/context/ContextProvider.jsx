import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  userToken: null,
  setUserToken: () => {},
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, setUserToken] = useState(null);

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UserStateContext = () => useContext(StateContext);
