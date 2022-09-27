import React from 'react';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
import Search from './components/Search.jsx';

const App = (props) => {

  return (
    <div>
      <Search />
    </div>
  )
}

root.render(<App />);;