import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={import.meta.env.DEV ? <Admin /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
