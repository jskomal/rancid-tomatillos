import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App/App'
import { BrowserRouter } from 'react-router-dom';

const router = <BrowserRouter> <App /> </BrowserRouter>;

ReactDOM.render(
  <React.StrictMode>
    { router }
  </React.StrictMode>,
  document.getElementById('root')
)
