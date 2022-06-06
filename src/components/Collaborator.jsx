import React from 'react';

import "./Collaborator.css"


const Collaborator = ( props ) => {
    return ( <a href={props.url} target="_blank" className='collaborator'>
        <img src={props.avatar_url} alt="" />
        <p>{props.login}</p>
    </a> );
}
 
export default Collaborator;