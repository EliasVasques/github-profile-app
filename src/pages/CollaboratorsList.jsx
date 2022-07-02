import React from "react";

import Collaborator from "../components/Collaborator";
import './CollaboratorsList.css';

import { v4 as uuidv4 } from "uuid";

const CollaboratorsList = ({ collaborators }) => {
  return (
    <div className="collaborators">
      {collaborators.map((collaborator) => (
        <Collaborator
          avatar_url={collaborator.avatar_url}
          login={collaborator.login}
          key={uuidv4()}
          url={`https://github.com/${collaborator.login}`}
        />
      ))}
    </div>
  );
};

export default CollaboratorsList;
