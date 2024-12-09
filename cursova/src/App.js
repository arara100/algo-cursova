import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Graph } from './pages/Graph';
import { Tree } from './pages/Tree';

import './styles/global.css';

export function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/graph" element={<Graph />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/" element={<MainContent />} />
      </Routes>
    </div>
  );
}
