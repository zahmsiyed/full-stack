import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CounterPage from "./pages/CounterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
