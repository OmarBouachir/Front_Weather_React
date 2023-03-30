import './App.css';
import Login from './component/authentification/Login';
import Register from './component/authentification/Register';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard';
function App() {
  return (
    <div>
      
      <Routes>
        <Route path='' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
           
    </div>
  );
}

export default App;
