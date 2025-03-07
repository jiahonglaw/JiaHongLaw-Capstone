import { useState, useEffect } from 'react'
import './StockForm.css'
import StockContext from './contexts/StockContext'
import StockList from './StockList'

function StockForm () {

    const [tempstockSymbol, setStockSymbol] = useState("");
    const [tempquantity, setQuantity] = useState("");
    const [temppurchasePrice, setPurchasePrice] = useState("");
    const [stockSymbol, setFinalStockSymbol] = useState("");
    const [quantity, setFinalQuantity] = useState("");
    const [purchasePrice, setFinalPrice] = useState("");
    
    const handleAddStock = (event) => {
        event.preventDefault(); 

        if (!tempstockSymbol || !tempquantity || !temppurchasePrice) {
            alert("Please fill in all fields");
            return;
        }

        
        setFinalStockSymbol(tempstockSymbol)
        setFinalQuantity(tempquantity)
        setFinalPrice(temppurchasePrice)
       
        setStockSymbol("");
        setQuantity("");
        setPurchasePrice("");
    };

  
    return (

        <StockContext.Provider 
        value = {{stockSymbol,quantity,purchasePrice}}
        >
        <div className="dashboard-container">
            <h1>Finance Dashboard</h1>

        <form className="stock-form">
        <input type="text" 
        placeholder="Stock Symbol" 
        value={tempstockSymbol} 
        onChange={(event)=> setStockSymbol(event.target.value)}/>
        <br /><br />
        <input type="number" 
        placeholder="Quantity"
        value={tempquantity}
        onChange={(event)=> setQuantity(event.target.value)} />
        <br /><br />
        <input type="number" 
        placeholder="Purchase Price" 
        value={temppurchasePrice}
        onChange={(event)=>setPurchasePrice(event.target.value)}
        /><br /><br />
        <button className="add-stock-btn" 
        type="submit"
        onClick={handleAddStock}>Add Stock</button>
        </form>
        </div>
        <StockList/>
        </StockContext.Provider>

    )
}


export default StockForm