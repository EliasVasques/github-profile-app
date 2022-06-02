import React from 'react';

import "./Collaborator.css"


const Collaborator = ( props ) => {
    console.log("oi" + props.name + props.avatar_url)
    return ( <div >
        <img src={props.avatar_url} alt="" />
        <p>{props.name}</p>
    </div> );
}
 
export default Collaborator;