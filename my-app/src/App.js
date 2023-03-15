import './App.css';
import Landing from './Compenents/Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Landing} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
