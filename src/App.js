import './App.css';
import NavigationBar from './nav/navbar';
import SliderBar from './nav/slidebar';
import { Route, Routes } from 'react-router-dom';
import Dash from './dash/dashboard';
import Error from './error/error';
import MonitoreoListener from './monitoreoBD/monitoreoListener';
import MonitoreoLogs from './monitoreoBD/monitoreoLogs';
import MonitoreoDiscos from './monitoreoBD/monitoreoDiscos';
import MonitoreoSMCC from './monitoreoBD/monitoreoSMCC';
import MonitoreoInformix from './monitoreoBD/monitoreoInformix';
import DashAceyus from './dash/dashaceyus';
import Users from './usuarios/users';
import Reports from './dowloadFiles/reports';
import Login from './login/login';

function App() {
  return (
    <div >
      <NavigationBar />
      <div className='flex'>
        <SliderBar />

        <div className='content w-100'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='dashboard' element={<Dash />} />
            <Route path='monitoreolistener' element={<MonitoreoListener />} />
            <Route path='monitoreologs' element={<MonitoreoLogs />} />
            <Route path='monitoreodiscos' element={<MonitoreoDiscos />} />
            <Route path='monitoreosmcc' element={<MonitoreoSMCC />} />
            <Route path='monitoreoinformix' element={<MonitoreoInformix />} />
            <Route path='users' element={<Users />} />
            <Route path='dashboardnacional' element={<DashAceyus/>}/>
            <Route path='reportes' element={<Reports/>}/>
            <Route path='copy'></Route>
            <Route path='*' element={<Error />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
