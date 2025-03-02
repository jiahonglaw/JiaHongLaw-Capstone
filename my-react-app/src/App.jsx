import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tempStockSymbol, setStockSymbol] = useState("");
  const [tempQuantity, setQuantity] = useState("");
  const [tempPurchasePrice, setPurchasePrice] = useState("");
  
  
  const [stocks, setStocks] = useState([]);
  const [stocklist, setStockList] = useState([]);


  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!tempStockSymbol || !tempQuantity || !tempPurchasePrice) return;

    const newStock = {
      stockSymbol: tempStockSymbol,
      quantity: tempQuantity,
      purchasePrice: tempPurchasePrice,
    };

    setStocks([...stocks, newStock]);
    setTempStockSymbol('');
    setTempQuantity('');
    setTempPurchasePrice('');
  };

  useEffect(() => {
    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo')
      .then(res => res.json())
      .then(data =>setStockList(data));
  }, []);
 
  return (

    
    <div className="dashboard-container">
      <h1>Finance Dashboard</h1>

        <form className="stock-form" onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Stock Symbol" 
        value={tempStockSymbol} 
        onChange={(event)=> setStockSymbol(event.target.value)}/>
        <br /><br />
        <input type="number" 
        placeholder="Quantity"
        value={tempQuantity}
        onChange={(event)=> setQuantity(event.target.value)} />
        <br /><br />
        <input type="number" 
        placeholder="Purchase Price" 
        value={tempPurchasePrice}
        onChange={(event)=>setPurchasePrice(event.target.value)}
        /><br /><br />
        <button className="add-stock-btn" type="submit">Add Stock</button>
        </form>        
        
        {/* Stock List */}
        <h2>Stock List</h2>
        {stocks.length ===0 ?(
          <p>No stocks added yet</p>
        ): (
          stocks.map((stock,index) =>(
            <div key={index}>
              <p className="symbol">Symbol:{stock.stockSymbol}</p>
              <p>Quantity: {stock.quantity}</p>
              <p>Purchase Price: {stock.purchasePrice} </p>
              <p>Current Price: 100</p>
              <p className="gains"> Profit/Loss: +/- 100 </p>
              </div>
          ))
        )}
        </div>
  )
}

export default App
