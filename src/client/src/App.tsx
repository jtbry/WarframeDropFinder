import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ItemSearch from './components/ItemSearch';
import HomePage from './routes/HomePage';
import ItemPage from './routes/ItemPage';

function WithNavbar(element: JSX.Element) {
  return (
    <div>
      <div className="flex flex-row justify-between p-2 md:p-6 ">
        <div className="mx-auto w-full md:w-1/2">
          <ItemSearch placeholder="Search for an item" />
        </div>
      </div>
      {element}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Item" element={WithNavbar(<ItemPage />)} />
    </Routes>
  );
}

export default App;
