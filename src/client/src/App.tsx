import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavLayout from './components/NavLayout';
import ComponentPage from './routes/ComponentPage';
import HomePage from './routes/HomePage';
import ItemPage from './routes/ItemPage';
import NotFoundPage from './routes/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/Item" element={<ItemPage />} />
        <Route path="/Component" element={<ComponentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
