import axios from "axios";
import { useState } from "react";

import { Route, Routes,Link } from "react-router-dom";

import SearchDev from "./pages/SeachDev";
import CollaboratorsList from "./pages/CollaboratorsList";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [infoSearched, setInfoSearched] = useState({
    login: "",
    avatar_url: "",
    html_url: "",
  });
  const [infoRepository, setRepositorySearched] = useState([]);
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
    setSearch("");
  };

  const handleAddCollaboratorClick = (login, avatarUrl) => {
    const newCollaborator = { login: login, avatar_url: avatarUrl };
    if (!collaboratorAlreadyRegistered(newCollaborator)) {
      setCollaborators([...collaborators, newCollaborator]);
      window.alert("Colaborador registrado com sucesso!")
    }
    else window.alert("Colaborador já registrado!");
  };

  const collaboratorAlreadyRegistered = (newCollaborator) => {
    return collaborators.some((collaborator) => {
      return newCollaborator.login === collaborator.login;
    });
  };

  return (
    <div className="container">
      <h2>Forme um time de devs.</h2>

      <div className="navbar">
        <ul type="none">
          <li>
            <Link to='/'>Busque Devs</Link>
          </li>
          <li>
            <Link to='/collaborators'>Seus colaboradores</Link>
          </li>
        </ul>
      </div>
      
      <Routes>
        <Route
          path="/"
          element={
            <SearchDev
              handleSearchClick={handleSearchClick}
              handleAddCollaboratorClick={handleAddCollaboratorClick}
              infoSearched={infoSearched}
              repositorySearched={infoRepository}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/collaborators"
          element={<CollaboratorsList collaborators={collaborators} />}
        />
      </Routes>
    </div>
  );
}

export default App;
