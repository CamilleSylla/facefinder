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
      imageURL:'',
      box: {},
    }
  }
  calculateFaceLocation = (data) => {
      const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return{
        leftCol: clarifaiface.left_col * width,
        topRow: clarifaiface.top_row * height,
        rightCol: width - (clarifaiface.right_col * width),
        bottomRow: height - (clarifaiface.bottom_row * height)
      }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
      
    
    app.models
    .predict(
      "a403429f2ddf4b49b307e318f00e528b",
       "https://samples.clarifai.com/face-det.jpg")
       .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
       .catch(err => console.log(err))
      
    

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
     <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
    </div>
  );
}
  
}

export default App;
