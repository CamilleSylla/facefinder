import React from 'react';
import Tilt from'react-tilt';
import "./logo.css";
import logo from './logo.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
        <Tilt className="Tilt br2" options={{ max : 80 }} style={{ height: 250, width: 250 }} >
        <div className="Tilt-inner pa3">
            <img style={{paddingTop: '5px', width: '70%'}} alt=" logo" src={logo}/> 
            </div>
        </Tilt>
        </div>
    )
}
export default Logo;