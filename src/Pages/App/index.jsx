import { useRoutes , BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import Users from '../Users'
import Navbar from '../../Components/Navbar';
import Vehicle from '../Vehicle';
import Bookings from '../Bookings';
import './App.css'
import Footer from '../../Components/Footer';
import CheckIn from '../CheckIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = () => {
  let routes = useRoutes([
    { path:'/', element:<Home />},
    { path: '/Users', element: <Users /> },    
    { path: '/Vehicle', element: <Vehicle /> },    
    { path: '/Bookings', element: <Bookings /> },
    { path: '/CheckIn', element: <CheckIn /> },
  ])
  return routes
}

const App = () => {

  return (
    <BrowserRouter>      
      <Navbar/>
      <ToastContainer />
      <AppRoutes />
      <Footer/>
    </BrowserRouter>
  )
}
export default App
