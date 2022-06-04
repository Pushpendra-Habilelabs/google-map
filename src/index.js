import React from "react";
import ReactDOM from "react-dom";
import GoogleMap from "./Map.jsx";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <GoogleMap />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
