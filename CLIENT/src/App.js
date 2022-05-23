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

function App() {
  return (
    <div className="App">

      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/purchase" element={<Purchase></Purchase>} />
        <Route path="review" element={<Reviews></Reviews>} />
        <Route path="about" element={<About></About>} />
        <Route path="blog" element={<Blogs></Blogs>} />
        <Route path="signIn" element={<SignIn></SignIn>} />
        <Route path="signUp" element={<SignUp></SignUp>} />
        <Route path="dashboard" element={<Dashboard></Dashboard>} />
        <Route path="myAccount" element={<MyAccount></MyAccount>} />
        <Route path="/productDetails/:id" element={<Purchase></Purchase>}></Route>
        <Route path="/*" element={<NotFound></NotFound>} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
