import * as React from 'react';

export default function Page({ title, children }) {
  return (
    <div className="App">
      <div className="page-title">
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  )
}