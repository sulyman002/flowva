import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlowvaLayout from './layout/FlowvaLayout';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlowvaLayout />}>
          <Route index element={<Home />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;