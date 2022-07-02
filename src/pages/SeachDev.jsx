import React from "react";

import { CgSearch } from "react-icons/cg";
import { CgAdd } from "react-icons/cg";

import Repository from "../components/Repository";
import "./SearchDev.css";

const SearchDev = ({
  handleSearchClick,
  handleAddCollaboratorClick,
  infoSearched,
  repositorySearched,
  search,
  setSearch,
}) => {
  return (
    <div className="search-dev">
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
        className="search-result"
        style={infoSearched.login == "" ? { display: "none" } : { display: "" }}
      >
        <div className="dev-info">
          <img src={infoSearched.avatar_url} alt="" />
          <p className="user-name">{infoSearched.login}</p>
          <CgAdd
            className="add-collaborator"
            onClick={() =>
              handleAddCollaboratorClick(
                infoSearched.login,
                infoSearched.avatar_url
              )
            }
          />
        </div>
        <div className="repos">
          {repositorySearched.map((rep) => (
            <div>
              <Repository name={rep.name} key={rep.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDev;
