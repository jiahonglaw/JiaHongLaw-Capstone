import { useState, useEffect } from 'react'
import './StockForm.css'
import StockContext from './contexts/StockContext'
import StockList from './StockList'

function StockForm () {

    const [stockSymbol, setStockSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");

  
    return (

        <StockContext.Provider 
        value={{
          stockSymbol,
          quantity,
          purchasePrice,
        }}
        >
        <div className="dashboard-container">
            <h1>Finance Dashboard</h1>

        <form className="stock-form">
        <input type="text" 
        placeholder="Stock Symbol" 
        value={stockSymbol} 
        onChange={(event)=> setStockSymbol(event.target.value)}/>
        <br /><br />
        <input type="number" 
        placeholder="Quantity"
        value={quantity}
        onChange={(event)=> setQuantity(event.target.value)} />
        <br /><br />
        <input type="number" 
        placeholder="Purchase Price" 
        value={purchasePrice}
        onChange={(event)=>setPurchasePrice(event.target.value)}
        /><br /><br />
        <button className="add-stock-btn" type="submit">Add Stock</button>
        </form>
        </div>
        <StockList/>
        </StockContext.Provider>

    )
}

export default StockForm