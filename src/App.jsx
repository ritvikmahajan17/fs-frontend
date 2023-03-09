import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Errorpage, Homepage, Loginpage, PageNotFound, Registerpage } from './pages';
import { ContentTypePage } from './pages/ContentTypePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/contenttypes" element={<ContentTypePage />} />
          <Route path="/error/:errorcode" element={<Errorpage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
