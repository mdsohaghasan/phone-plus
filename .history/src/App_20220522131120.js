import "./App.css";
import Navbar from "./SharedComponents/Navbar/Navbar";

import { Routes, Route, Link } from "react-router-dom";

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
