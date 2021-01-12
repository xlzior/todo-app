import * as React from 'react';

type PageProps = {
  title: string,
  children: React.ReactNode
}

export default function Page({ title, children }: PageProps) {
  return (
    <div className="App">
      <div className="page-title">
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  )
}