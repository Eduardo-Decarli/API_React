// src/App.js
import React from 'react';
import StockQuote from './components/StockQuote';

function App() {
  return (
    <div className="App">
      <h1>Consulta de Ações com Alpha Vantage</h1>
      <StockQuote />
    </div>
  );
}

export default App;
