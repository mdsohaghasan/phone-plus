import "./App.css";
import Navbar from "./SharedComponents/Navbar/Navbar";
import Home from "./Shar";

import { Routes, Route, Link } from "react-router-dom";
import { Home } from ".";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
