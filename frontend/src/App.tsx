import React from 'react';

import './App.css';
import Photos from './containers/Photos/Photos';
import NewPhoto from './containers/NewPhoto/NewPhoto';

const App: React.FC = () => {
  return (
    <div className="App">
      <NewPhoto />
      <Photos />
    </div>
  );
};

export default App;
