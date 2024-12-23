import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import CardOne from "./pages/CardOne";
import CardTwo from "./pages/CardTwo";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardOne />} />
        <Route path="/1" element={<CardTwo />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;