import "./Login.css";
import { useState, useContext } from "react";
import usersFetch from "../axios/config";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        email,
        password,
      };

      const response = await usersFetch.post("/login", user);
      
      // Armazenar o token no localStorage
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (err) {
      console.error("Erro ao enviar solicitação:", err);
    }
  };


  return (
    <div className="login-container">
      <h1>Entre com sua conta</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Seu E-mail:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
          />
          <label htmlFor="password">Sua Senha:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
          />
          <input onClick={handleSubmit} type="submit" value="enviar" />
        </div>
      </form>
    </div>
  );
};

export default Login;
