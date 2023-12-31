import axios from "axios";

const usersFetch = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

// Função para obter o token armazenado localmente
const getToken = () => {
  return localStorage.getItem("token");
};

// Adiciona um interceptor para todas as requisições feitas com usersFetch
usersFetch.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default usersFetch;