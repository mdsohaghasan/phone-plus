import "./App.css";
import Navbar from "./SharedComponents/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";

import { Routes, Route, Link } from "react-router-dom";
import Contact from "./PagesContactContact";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
