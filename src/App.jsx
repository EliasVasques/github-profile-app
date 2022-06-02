import axios from "axios";
import { useState, useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import { CgAdd } from "react-icons/cg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Repository from "./components/Repository";
import Collaborators from "./components/Collaborators";

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
  const [onRouteSearch, setOnRouteSearch] = useState(true)

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
  };

  const handleAddCollaboratorClick = ( login, avatarUrl ) => {
    setCollaborators(
      [ ...collaborators, 
        { "name": login, "avatar_url": avatarUrl }
      ]);
  };

  const handleClickOption = ( onRouteSearch ) => {
    setOnRouteSearch(onRouteSearch)
  }

  return (
    <div className="container">

      <div className="options">
        <div 
          className={onRouteSearch ? "ativo" : "desativado"}
          onClick={() => handleClickOption(true)}>
            <a href="/">Busque colaboradores!</a>
        </div>
        <div 
          className={onRouteSearch ? "desativado" : "ativo"}
          onClick={() => handleClickOption(false)}>
            <a href="/collaborators">Veja os colaboradores!</a>
        </div>
      </div>

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="search-repositories">
                  <input
                    type="text"
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <CgSearch
                    className="search-icon"
                    onClick={handleSearchClick}
                  />
                </div>

                <div className="search-result">
                  <img src={infoSearched.avatar_url} alt="" />
                  <h3>{infoSearched.login}</h3>
                  <CgAdd
                    className="add-collaborator"
                    onClick={() =>
                      handleAddCollaboratorClick(infoSearched.login, infoSearched.avatar_url)
                    }
                  />

                  <div className="repos">
                    {repositorySearched.map((rep) => (
                      <Repository name={rep.name} key={rep.name} />
                    ))}
                  </div>
                </div>
              </>
            }
          />

          <Route path="/collaborators" element={
            <>
              <Collaborators collaborators={collaborators} />
            </>
           } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
