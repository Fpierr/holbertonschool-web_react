import React from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';

export default function Header() {
  return (
    <div className="App-header flex items-center gap-4 border-b border-gray-200 p-4">
      <img src={holbertonLogo} className="h-16 w-16" alt="Holberton logo" />
      <h1 className="text-3xl font-bold text-[var(--main-color)]">
        School dashboard
      </h1>
    </div>
  );
}
