/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";

import { ChakraProvider } from "@chakra-ui/react"

import "./App.css"

function App() {
  const [user, setUser] = useState({});
  const [input, setInput] = useState();

  useEffect(() => {
    fetch(`https://api.github.com/users/exemple`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  }, [])

  const handleSearch = (event) => {
    event.preventDefault();
    
    fetch(`https://api.github.com/users/${input}`)
    .then(res => res.json())
    .then(data => {
      setUser(data);
      console.log(data);
    });
  }

  return (
    <div className="App">
      <ChakraProvider>
        <div className="navbar">Busca de Perfis do Github</div>
        <form onSubmit={handleSearch} className="form">
          <input className="input" placeholder="Nome do Usuário" onChange={e => setInput(e.target.value)}/>
          <button className="button" type="submit">Pesquisar</button>
        </form>
        <div className="card">
          <div className="card-img">
            <img src={user.avatar_url} alt={user.name} />
          </div>
          <div className="card-content">
            <h3>{user.name || 'Name'}</h3>
            <h4>{user.login || 'User Name'}</h4>
          </div>
          <div className="card-footer">
            <h4> 
              <FaUserFriends /> 
              {user.following} Following
            </h4>
            <h4> 
              <FaUserFriends /> 
              {user.followers} Followers
            </h4>
            <a href={user.public_repos} target="_blank"> 
              Acessar Repositórios
            </a>
          </div>
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
