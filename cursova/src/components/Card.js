import React from 'react';
import { Link } from 'react-router-dom';

export function Card({ title, link }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <Link to={link}>
        <button className="start-button">Start</button>
      </Link>
    </div>
  );
}
