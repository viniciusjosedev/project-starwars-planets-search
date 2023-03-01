import React from 'react';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchProvider from './context/FetchProvider';

function App() {
  return (
    <FetchProvider>
      <Home />
    </FetchProvider>
  );
}

export default App;
