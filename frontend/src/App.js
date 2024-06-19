import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Dashboard from './pages/users/Dashboard';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import Header from './components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header/>
          
          <Routes>
            <Route  path='/' element={<Dashboard />} ></Route>
            <Route  path='/login' element={<Login />} ></Route>
            <Route  path='/register' element={<Register />} ></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
