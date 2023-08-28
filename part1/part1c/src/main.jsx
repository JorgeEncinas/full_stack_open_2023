import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

let counter = 1;

const refresh = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <App counter={counter} />
  )
}
setInterval(() => {
  refresh()
  counter++;
}, 1000)
/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App counter={counter} />
  </React.StrictMode>,
) */
