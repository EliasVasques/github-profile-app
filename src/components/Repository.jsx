import React from 'react';

import "./Repository.css"


const Repository = ( { name } ) => {
    return ( <div className='repository'>
        <p>{name}</p>
    </div> );
}
 
export default Repository;