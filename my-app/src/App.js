import './App.css';
import Landing from './Compenents/Landing';
import Dashboard from './Compenents/Dashboard';
import FormPdf from './Compenents/FormPdf';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Download from './Compenents/Download';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Landing} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/formpdf' Component={FormPdf} />
          <Route path='/download' Component={Download} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
