import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/admin/users' element={<Users/>}/>
        <Route path='/admin/campuses' element={<h1>Campuses</h1>}/>
        <Route path='/admin/classrooms' element={<h1>Classrooms</h1>}/>
        <Route path='/admin/types' element={<h1>Types</h1>}/>
        <Route path='/admin/devices' element={<h1>Devices</h1>}/>
        <Route path='/admin/requests' element={<h1>Requests</h1>}/>
        <Route path='/*' element={<h1>404 not found</h1>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
