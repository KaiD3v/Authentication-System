import React, { useEffect, useState } from "react";
import "./Home.css";
import usersFetch from "../axios/config";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      const response = await usersFetch.get("/users");
      const data = response.data;
      setUsers(data);
    } catch (err) {
      console.error(`Houve um erro ao carregar servidor: ${err}`);
    }
  };

  const handleLogout = () => {
    // removendo o token do localStorage
    localStorage.removeItem("token");
  
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      
      navigate("/login");
    } else {
      // cabeçalho de autorização se houver um token
      usersFetch.defaults.headers.Authorization = `Bearer ${token}`;
      // Obtenha os posts apenas se houver um token
      getPosts();
    }
  }, []);

  return (
    <div className="home-container">
      <h1>Users List -</h1>
      <div>
      <button onClick={handleLogout}>Sair</button>
        <ul>
          {users.map((user) => (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              {/* Adicione o botão de logout e associe a função handleLogout ao evento onClick */}
              
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
