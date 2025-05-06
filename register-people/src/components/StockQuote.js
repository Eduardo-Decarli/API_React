import React, { useState } from 'react';
import '../App.css';

const StockQuote = () => {
  const [ticker, setTicker] = useState('');
  const [data, setData] = useState(null);
  const [erro, setErro] = useState('');

  const fetchQuote = async () => {
    setErro('');
    setData(null);
    const API_KEY = 'LVVFIZZ6MZCPWESY';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      if (json['Global Quote'] && json['Global Quote']['01. symbol']) {
        setData(json['Global Quote']);
      } else {
        setErro('Ticker não encontrado ou limite da API atingido.');
      }
    } catch (err) {
      setErro('Erro ao buscar dados. Tente novamente.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Consultar Ação</h2>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        placeholder="Digite o ticker (ex: AAPL)"
      />
      <button onClick={fetchQuote}>Buscar</button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {data && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Empresa:</strong> {data['01. symbol']}</p>
          <p><strong>Preço:</strong> ${data['05. price']}</p>
          <p><strong>Variação:</strong> {data['10. change percent']}</p>
          <p><strong>Data:</strong> {data['07. latest trading day']}</p>
        </div>
      )}
    </div>
  );
};

export default StockQuote;
