import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import About from "./pages/About"
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { FaSignOutAlt } from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <div>
      <Router>

        <nav>
          <div className='logo'>
            <Link to="/">
              <img src="/mca.jpg" alt="" id='img-logo'/>
              <img src="/mca6.png" alt="" id='text-logo'/> 
            </Link>
          </div>
          

        <div className='content'>
          {!isAuth ?
            (
            <div className='login'>
              <button><Link to="/login"> Login </Link></button>
            </div>) : 
            (
            <>
              <div className='posting'>
                <button><Link to="/createpost"> Create Post <span className='icon'><BsChatSquareText/></span></Link></button>
              </div>
              <div className='signout'>
                <button onClick={signUserOut}> Log Out <span className='icon'><FaSignOutAlt/></span></button>
              </div>
              
            </>
            )
          }

          <div className='about'>
                <Link to="/about">About</Link>
          </div>
        </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>

      </Router>
    </div>
   
  );
}

export default App;
