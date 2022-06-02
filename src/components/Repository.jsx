import React from 'react';

import "./Repository.css"


const Repository = ( { name } ) => {
    return ( <div className='repositories'>
        <p>{name}</p>
    </div> );
}
 
export default Repository;