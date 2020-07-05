import React from 'react';
import Clarifai from 'clarifai'
import './App.css';
import Navigation from './components/navigation/navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';


const app = new Clarifai.App({
  apiKey: 'bc475a4beff741c3a73d48b9c686ceee'
})

const particlesOptions = {
  particles : {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends React.Component {
  constructor () {
    super();
    this.state={
      input: '',
      imageURL:''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
      
    app.models.initModel(
      {id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("@@sampleTrain");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
      });


  }

  render() {
    return (
    <div className="App">
      <Particles className='particles'
                params={particlesOptions} />
        
     <Navigation/>
     <Logo/>
     <Rank/>
     <ImageLinkForm
      onInputChange={this.onInputChange}
      onButtonSubmit={this.onButtonSubmit}
      />
     <FaceRecognition imageURL={this.state.imageURL}/>
    </div>
  );
}
  
}

export default App;
