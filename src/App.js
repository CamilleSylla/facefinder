import React from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles : {
    line_linked: {
      shadow :{
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

function App() {
  return (
    <div className="App">
      <Particles 
                params={particlesOptions} />
        
     <Navigation/>
     <Logo/>
     <Rank/>
     <ImageLinkForm/>
     {/*<FaceRecognition/>*/}
    </div>
  );
}

export default App;
