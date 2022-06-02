import React from 'react';

import Collaborator from './Collaborator';

import "./Collaborators.css"


const Collaborators = ( { collaborators } ) => {
    console.log(collaborators)
    return ( <div >
        {
            collaborators.map((collaborator) => 
                <Collaborator avatar_url={collaborator.avatar_url} name={collaborator.name} />
            )
        }
    </div> );
}
 
export default Collaborators;