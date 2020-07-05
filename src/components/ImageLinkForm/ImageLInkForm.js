import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3 center'>
                {'This Wolf with his incredible eyes will detect faces on pictures... Maybe this wolf got a Sharingan'}
            </p>
            <div className='center '>
                    <input className= 'f4 pa2 w-70 center'type='text' onChange={onInputChange}/>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    );
}
export default ImageLinkForm;