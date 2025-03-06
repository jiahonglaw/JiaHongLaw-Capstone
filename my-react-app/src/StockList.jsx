import { useContext } from 'react';
import StockContext from './StockContext';

const StockList = () => {
  const { stocks, stockData } = useContext(StockContext);

  return (
    <div>
      <h2>Stock List</h2>
      {stocks.length === 0 ? (
        <p>No stocks added yet</p>
      ) : (
        stocks.map((stock, index) => {
          const { stockSymbol, quantity, purchasePrice } = stock;
          const currentPrice = stockData[stockSymbol]?.["05. price"] ? Number(stockData[stockSymbol]["05. price"]) : 0;
          const profitLoss = (currentPrice - purchasePrice) * quantity;

          return (
            <div key={index}>
              <p>Symbol: {stockSymbol}</p>
              <p>Quantity: {quantity}</p>
              <p>Purchase Price: ${purchasePrice.toFixed(2)}</p>
              <p>Current Price: ${currentPrice.toFixed(2)}</p>
              <p className={profitLoss >= 0 ? 'profit' : 'loss'}>
                {profitLoss >= 0 ? `Profit: +$${profitLoss.toFixed(2)}` : `Loss: -$${Math.abs(profitLoss).toFixed(2)}`}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default StockList;