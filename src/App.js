import React from 'react';
import Drumpad from './Drum-pad';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='container'>
        <Drumpad />
      </div>
    );
  }  
};

export default App;