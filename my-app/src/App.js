import './App.css';
import Landing from './Compenents/Landing';
import Dashboard from './Compenents/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Landing} />
          <Route path='/dashboard' Component={Dashboard} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
