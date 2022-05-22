import "./App.css";
import Navbar from "./SharedComponents/Navbar/Navbar";
import Navbar from "./SharedComponents/Navbar/Navbar";

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
