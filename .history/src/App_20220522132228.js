import "./App.css";
import Navbar from "./SharedComponents/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";

import { Routes, Route, Link } from "react-router-dom";
import Blog from ".historysrcPagesBlogBlog_20220522131940";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
