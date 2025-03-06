import { useState, useEffect } from 'react'
import './StockForm.css'
import StockContext from './contexts/StockContext'
import StockList from './StockList'

function StockForm () {

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

        <StockContext.Provider 
        value={{
          tempStockSymbol,
          tempQuantity,
          tempPurchasePrice,
          stocks,
          stocklist,
        }}
        >
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
        </div>
        <StockList/>
        </StockContext.Provider>

    )
}

export default StockForm