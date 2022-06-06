import axios from "axios";
import { useState, useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import { CgAdd } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";

import Repository from "./components/Repository";
import Collaborator from "./components/Collaborator";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [infoSearched, setInfoSearched] = useState({
    login: "",
    avatar_url: "",
    html_url: "",
  });
  const [repositorySearched, setRepositorySearched] = useState([]);
  const [collaborators, setCollaborators] = useState([]);

  const handleSearchClick = () => {
    axios
      .get(`https://api.github.com/users/${search}`)
      .then((result) => {
        const data = result.data;
        const newSearchResult = {
          login: data.login,
          avatar_url: data.avatar_url,
          html_url: data.html_url,
        };
        axios
          .get(data.repos_url) // setando resositórios
          .then((result) => {
            setInfoSearched(newSearchResult);
            setRepositorySearched(result.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    setSearch("")
  };

  const handleAddCollaboratorClick = (login, avatarUrl) => {
    const newCollaborator = { login: login, avatar_url: avatarUrl };
    if(!collaboratorAlreadyRegistered(newCollaborator)) setCollaborators( [
      ...collaborators,
      newCollaborator,
    ]) 
    else window.alert('Colaborador já registrado!')
  };

  const collaboratorAlreadyRegistered = ( newCollaborator ) => {
    return collaborators.some( collaborator => {
      return newCollaborator.login === collaborator.login;
    })
  }

  return (
    <div className="container">
      <div className="search-collabatorator">
        <div className="search">
          <input
            type="text"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CgSearch className="search-icon" onClick={handleSearchClick} />
        </div>
        <div 
          className="search-result">
            
          <img src={infoSearched.avatar_url} alt="" />
          <h3>{infoSearched.login}</h3>
          <CgAdd
            className="add-collaborator"
            onClick={() =>
              handleAddCollaboratorClick(
                infoSearched.login,
                infoSearched.avatar_url
              )
            }
          />
          <div className="repos">
            {repositorySearched.map((rep) => (
              <Repository name={rep.name} key={rep.name} />
            ))}
          </div>
        </div>
      </div>

      <div className="collaborators">
        <h2>Colaboradores</h2>
        {
        collaborators.map((collaborator) => (
          <Collaborator
            avatar_url={collaborator.avatar_url}
            login={collaborator.login}
            key={uuidv4()}
            url={`https://github.com/${collaborator.login}`}
          />
        ))
        }
      </div>
    </div>
  );
}

export default App;
