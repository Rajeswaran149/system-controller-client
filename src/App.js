import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './pages/Home/homepage';
import Compliants from './pages/compliants';
import Electricians from './pages/electricians';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/electricians" element= {<Electricians />}/>
        <Route path="/complaints" element= {<Compliants />}/>

      </Routes>
    </Router>
  );
}

export default App;
