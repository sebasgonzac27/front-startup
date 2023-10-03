import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { ClientView } from './pages/ClientView';
import { ClientRequest } from './pages/ClientRequest';
import { DashboardRequest } from './pages/DashboardRequest';
import { Campuses } from './pages/Campuses';
import { Classrooms } from './pages/Classrooms';
import { Types } from './pages/Types';

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
        <Route path='/admin/devices' element={<h1>Devices</h1>}/>
        <Route path='/admin/requests' element={<h1>Requests</h1>}/>

        <Route path='/client' element={<ClientView/>}/>
        <Route path='/client/requests' element={<DashboardRequest/>}/>
        <Route path='/client/create-request' element={<ClientRequest/>}/>
        <Route path='/*' element={<h1>404 not found</h1>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
