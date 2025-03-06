import './StockList.css';
import StockContext from './contexts/StockContext';
import {useContext} from "react";

function StockList () {
    const StockContextValue = useContext(StockContext)
    
    return( <div>
    <h2>Stock List</h2>
    {stocks.length === 0 ? (
      <p>No stocks added yet</p>
    ) : (
      stocks.map((stock, index) => {
        const { stockSymbol, quantity, purchasePrice, currentPrice } = stock;
        let profitLoss = 0;
    
        if (currentPrice > purchasePrice) {
          profitLoss = (currentPrice - purchasePrice) * quantity;
        } else if (currentPrice < purchasePrice) {
          profitLoss = (currentPrice - purchasePrice) * quantity;
        }
        return (
          <div key={index}>
            <p className="symbol">Symbol: {stockSymbol}</p>
            <p>Quantity: {quantity}</p>
            <p>Purchase Price: ${purchasePrice}</p>
            <p>Current Price: ${currentPrice}</p>
            <p className="gains">
              {profitLoss > 0 ? `Profit: +$${profitLoss}` :
               profitLoss < 0 ? `Loss: -$${Math.abs(profitLoss)}` :
               "No Gain/Loss"}
            </p>
          </div>
        );
      })
    )}
    </div>)     
}

export default StockList