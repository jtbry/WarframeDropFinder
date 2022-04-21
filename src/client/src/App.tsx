import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import ItemPage from './routes/ItemPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Item" element={<ItemPage />} />
    </Routes>
  );
}

export default App;
