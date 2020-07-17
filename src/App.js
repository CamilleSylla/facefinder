import React from 'react';
import Clarifai from 'clarifai'
import './App.css';
import Navigation from './components/navigation/navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


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
      route: 'signin',
      isSignedIn: false,
      user: {
            id: '',
            name: '',
            email: '',
            password: '',
            entries: 0,
            joined: ''
      }
    }
  }

  loadUser =(data) => {
    this.setState({user :{
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            entries: data.entries,
            joined: data.joined
    }})
  }

  

  calculateFaceLocation = (data) => {
      let clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      let width = Number(image.width);
      let height = Number(image.height);
      console.log(width, height);
      return{
        
        topRow: clarifaiFace.top_row * height,
        leftCol: clarifaiFace.left_col * width,
        bottomRow: height - (clarifaiFace.bottom_row * height),
        rightCol: width - (clarifaiFace.right_col * width)
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
      Clarifai.FACE_DETECT_MODEL,
        this.state.input    
        )
       .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
       .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn : false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
    <div className="App">
      <Particles className='particles'
                params={particlesOptions} />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
     { this.state.route ==='home' 
    ? <div>
        <Logo/>
        <Rank/>
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
      </div>
    : (
      this.state.route === 'signin' 
      ? <Signin onRouteChange={this.onRouteChange}/>
      : <Register onRouteChange={this.onRouteChange}/>
      

    )
    
     
     }
    </div>
  );
}
  
}

export default App;
