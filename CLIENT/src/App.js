import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Reviews from './Pages/Reviews/Reviews';
import Dashboard from './Pages/Dashboard/Dashboard';
import Blogs from './Pages/Blogs/Blogs';
import About from './Pages/About/About';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import NotFound from './Pages/NotFound/NotFound';
import Purchase from './Pages/Purchase/Purchase';
import Footer from './Components/Footer/Footer';
import RequireAuth from './Hooks/RequireAuth/RequireAuth';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
import MyReviews from './Pages/Dashboard/MyReviews/MyReviews';
import MyAccount from './Pages/Dashboard/MyAccount/MyAccount';
import Payment from './Pages/Dashboard/Payment/Payment';
import AddProduct from './Pages/Dashboard/AddProduct/AddProduct';
import ManageProducts from './Pages/Dashboard/ManageProducts/ManageProducts';
import ManageUsers from './Pages/Dashboard/ManageUsers/ManageUsers';
import ManageOrders from './Pages/Dashboard/ManageOrders/ManageOrders';
import RequireAdmin from './Hooks/RequireAdmin/RequireAdmin.JS';

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
        <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} >
          <Route index element={<MyOrders></MyOrders>}></Route>
          <Route path="myAccount" element={<MyAccount></MyAccount>}></Route>
          <Route path="myReviews" element={<MyReviews></MyReviews>}></Route>
          <Route path="payment/:id" element={<Payment />}></Route>
          {/* ADMIN ROUTE  */}
          <Route path="addProduct" element={
            // <RequireAdmin>
            <AddProduct />
            // </RequireAdmin> 
          }></Route>
          <Route path="manageProducts" element={
            // <RequireAdmin>
            <ManageProducts />
            // </RequireAdmin> 
          }></Route>
          <Route path="manageusers" element={
            // <RequireAdmin>
            <ManageUsers />
            // </RequireAdmin>
          }></Route>
          <Route path="manageOrders" element={<RequireAdmin><ManageOrders /></RequireAdmin>}></Route>
        </Route>


        <Route path="/productDetails/:id" element={<Purchase />}></Route>
        <Route path="/*" element={<NotFound></NotFound>} />
      </Routes>

      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
