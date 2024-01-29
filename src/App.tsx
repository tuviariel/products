import React from 'react';
import NavBar from "./components/NavBar"
import Main from "./components/Main"
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar title="My Store" />
      <Main />
    </div>
  );
}

export default App;
