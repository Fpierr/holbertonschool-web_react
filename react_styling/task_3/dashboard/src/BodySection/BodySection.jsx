import React from 'react';

function BodySection({ title, children }) {
  return (
    <div className="App-bodysection mt-8">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default BodySection;
