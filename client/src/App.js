import './App.css';
import Footer from './components/views/Footer/Footer';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from './hoc/auth';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={Auth(LandingPage,null)} />
          <Route path="/login" element={Auth(LoginPage,false)} />
          <Route path="/register" element={Auth(RegisterPage,false)} />
          a
      </Routes>
    </BrowserRouter>
  );
}

export default App;
