import React from 'react';
import Movies from './components/movies/Moives';
import Filtering from './components/Filtering/Filtering';
function App() {
  return (
    <div className="App">
      <Filtering />
      <Movies />
    </div>
  );
}

export default App;
