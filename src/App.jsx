import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Errorpage, Loginpage, PageNotFound, Registerpage } from './pages';
import { ContentTypePage } from './pages/ContentTypePage';
import ProtectedRoute from './utils/ProtectedRoutes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/" element={<ProtectedRoute><ContentTypePage /></ProtectedRoute>} />
          <Route path="/error/:errorcode" element={<Errorpage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
