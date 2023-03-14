

import Table from './components/table';
import {Routes, Switch,Route } from 'react-router-dom';
import Users from './components/users';


function App() {
  return (
    <div >
    
      <Routes>
    
        <Route path='/' element={<Table/>}/>
        <Route path='/users/:id' element={<Users/>}/>
      
      </Routes>
     
      
      
    </div>
  );
}

export default App;
