import React from 'react';
import { Card } from './Card';
import '../styles/main.css'

export function MainContent() {
  return (
    <main className="main-content">
      <div className="card-container">
        <Card title="Graph Algorithm" link="/graph" />
        <Card title="Data Structure" link="/tree" />
      </div>
    </main>
  );
}
