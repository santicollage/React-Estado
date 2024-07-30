import { UseState } from './UseState.js';
import { UseReducer } from './UseReducer.js';
import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="Use State"/>
      <UseReducer name="Use Reducer"/>
    </div>
  );
}

export default App;
