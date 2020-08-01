import React from 'react';
import Display from './components/Display';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store = {store}>
      <Display/>
    </Provider>
  );
}

export default App;
