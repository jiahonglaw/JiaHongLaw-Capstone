import { createContext, useState, useEffect } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [stockData, setStockData] = useState({});

  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`);
      const data = await response.json();
      setStockData((prevStockData) => ({ ...prevStockData, [symbol]: data["Global Quote"] }));
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <StockContext.Provider value={{ stocks, setStocks, stockData, fetchStockData }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockContext;