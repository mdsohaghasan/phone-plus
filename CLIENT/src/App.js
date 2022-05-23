import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Reviews from './Pages/Reviews/Reviews';
import Dashboard from './Pages/Dashboard/Dashboard';
import Blogs from './Pages/Blogs/Blogs';
import About from './Pages/About/About';
import { Route, Routes } from 'react-router-dom';
import MyAccount from './Pages/MyAccount/MyAccount';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import NotFound from './Pages/NotFound/NotFound';
import Purchase from './Pages/Purchase/Purchase';
import Footer from './Components/Footer/Footer';
import RequireAuth from './Hooks/RequireAuth/RequireAuth';

function App() {
  return (
    <div className="App">

      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/review" element={<Reviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/purchase" element={<RequireAuth><Purchase /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/myAccount" element={<RequireAuth><MyAccount /></RequireAuth>} />
        <Route path="/productDetails/:id" element={<Purchase />}></Route>
        <Route path="/*" element={<NotFound></NotFound>} />
      </Routes>

      <Footer></Footer>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
