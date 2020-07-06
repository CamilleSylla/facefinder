import React from 'react';

const Navigation = ({onLogOut}) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={onLogOut}className='f3 link dim black underline pa3 pointer'>Sign out</p>
        </nav>
    );
} 

export default Navigation;