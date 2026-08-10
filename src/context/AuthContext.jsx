import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(
    JSON.parse(localStorage.getItem("customer")) || null
  );
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  const customerLogin = (data, token) => {
    localStorage.setItem("customer", JSON.stringify(data));
    localStorage.setItem("token", token);
    setCustomer(data);
  };

  const customerLogout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("token");
    setCustomer(null);
  };

  const adminLogin = (data, token) => {
    localStorage.setItem("admin", JSON.stringify(data));
    localStorage.setItem("adminToken", token);
    setAdmin(data);
  };

  const adminLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ customer, admin, customerLogin, customerLogout, adminLogin, adminLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);