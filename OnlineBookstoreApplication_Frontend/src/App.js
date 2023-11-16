import logo from './logo.svg';
import './App.scss';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
//import User from './pages/User';
import Help from './pages/Help';
import Layout from './layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LoginLayout from './layout/LoginLayout';
import ProtectedRoute from './utils/ProtectedRoute';
import UserAcc from './pages/UserAcc';
import Layout2 from './layout/Layout2';
import EditUserDetails from './pages/EditUserDetails';



function App() {    // web link ekak nisa BrowerRouter gannawa
  return (


    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route  element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path='/help' element={<Help />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>

        <Route  element={<Layout2 />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/useracc" element={<UserAcc />}/>
            <Route path="/edituser" element={<EditUserDetails/>}/>
          </Route>
        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
