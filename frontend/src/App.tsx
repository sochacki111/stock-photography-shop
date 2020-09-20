import React from 'react';
import './App.css';
import { Photo } from './components/Photo/Photo';
import Photos from './containers/Photos/Photos';

const App: React.FC = () => {
  return (
    <div>
      <Photo title="my title" author="my author" />
      <Photo title="my title" author="my author" />
      <Photos />
    </div>
  );
};

export default App;
