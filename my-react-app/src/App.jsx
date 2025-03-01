import { useState } from 'react'
import './App.css'

function App() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
 
  return (

    
    <div className="dashboard-container">
      <h1>Finance Dashboard</h1>

        <form className="stock-form">
        <input type="text" 
        placeholder="Stock Symbol" 
        value={stockSymbol} 
        onClick={(event)=> setStockSymbol(event.target.value)}/>
        <br /><br />
        <input type="number" 
        placeholder="Quantity"
        value={quantity}
        onClick={(event)=> setQuantity(event.target.value)} />
        <br /><br />
        <input type="number" 
        placeholder="Purchase Price" 
        value={purchasePrice}
        onClick={(event)=>setPurchasePrice(event.target.value)}
        /><br /><br />
        <button className="add-stock-btn" type="submit">Add Stock</button>
        </form>        
        
        {/* Stock List */}
        <h2>Stock List</h2>
        {stockSymbol.length ===0 ?(
          <p>No stocks added yet</p>
        ): (
          stockSymbol.localeCompare((stock,index) =>(
            <div key={index}>
              <p className="symbol">Symbol:{stock.stockSymbol}</p>
              <p>Quantity: {stock.quantity}</p>
              <p>Purchase Price: {stock.purchasePrice} </p>
              <p>Current Price: 100</p>
              <p className="gains"> Profit/Loss: +/- xxx.xx</p>
              </div>
          ))


        )}
        
        

        </div>
  )
}

export default App
