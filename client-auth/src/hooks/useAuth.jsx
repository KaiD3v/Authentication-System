// useAuth.js
import { useState, useEffect, createContext, useContext } from "react";
import usersFetch from "../axios/config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      usersFetch.defaults.headers.Authorization = `Bearer ${token}`;
      getUserData();
    }

    setLoading(false);
  }, []);

  const getUserData = async () => {
    try {
      const response = await usersFetch.get("/user");
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await usersFetch.post("/login", { email, password });
      const token = response.data.token;

      localStorage.setItem("token", token);
      usersFetch.defaults.headers.Authorization = `Bearer ${token}`;
      getUserData();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    usersFetch.defaults.headers.Authorization = undefined;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}