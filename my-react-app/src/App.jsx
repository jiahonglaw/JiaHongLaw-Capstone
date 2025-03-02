import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tempStockSymbol, setTempStockSymbol] = useState("");
  const [tempQuantity, setTempQuantity] = useState("");
  const [tempPurchasePrice, setTempPurchasePrice] = useState("");
  
  
  const [stocks, setStocks] = useState([]);
  const [stocklist, setStockList] = useState([]);

  useEffect(() => {
    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo')
      .then(res => res.json())
      .then(data =>setStockList(data["Global Quote"]));
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!tempStockSymbol || !tempQuantity || !tempPurchasePrice) return;

    const newStock = {
      stockSymbol: tempStockSymbol,
      quantity: tempQuantity,
      purchasePrice: tempPurchasePrice,
      currentPrice: stocklist["05. price"]
    };

    setStocks([...stocks, newStock]);
    setTempStockSymbol('');
    setTempQuantity('');
    setTempPurchasePrice('');
  };




 
  return (

    
    <div className="dashboard-container">
      <h1>Finance Dashboard</h1>

        <form className="stock-form" onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Stock Symbol" 
        value={tempStockSymbol} 
        onChange={(event)=> setTempStockSymbol(event.target.value)}/>
        <br /><br />
        <input type="number" 
        placeholder="Quantity"
        value={tempQuantity}
        onChange={(event)=> setTempQuantity(event.target.value)} />
        <br /><br />
        <input type="number" 
        placeholder="Purchase Price" 
        value={tempPurchasePrice}
        onChange={(event)=>setTempPurchasePrice(event.target.value)}
        /><br /><br />
        <button className="add-stock-btn" type="submit">Add Stock</button>
        </form>        
        
        {/* Stock List */}
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
    </div>
  )
}

export default App
