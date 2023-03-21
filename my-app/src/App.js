import './App.css';
import Landing from './Compenents/Landing';
import Dashboard from './Compenents/Dashboard';
import FormPdf from './Compenents/FormPdf';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Landing} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/formpdf' Component={FormPdf} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
