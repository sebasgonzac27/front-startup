import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Campuses } from './pages/Campuses';
import { Classrooms } from './pages/Classrooms';
import { Types } from './pages/Types';
import { Devices } from './pages/Devices';
import { Requests } from './pages/Requests';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/admin/users' element={<Users/>}/>
        <Route path='/admin/campuses' element={<Campuses/>}/>
        <Route path='/admin/classrooms' element={<Classrooms/>}/>
        <Route path='/admin/types' element={<Types/>}/>
        <Route path='/admin/devices' element={<Devices/>}/>
        <Route path='/admin/requests' element={<Requests/>}/>
        <Route path='/*' element={<h1>404 not found</h1>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
