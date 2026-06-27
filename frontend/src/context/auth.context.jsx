import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        setIsAuthenticated,
        setUserRole,
        user,
        setUser,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
