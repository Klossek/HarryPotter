import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Start from './pages/Start.jsx';
import Lobby from './pages/Lobby.jsx';
import { UserProvider } from './context/UserContext';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/login" element={<Start />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>

);
