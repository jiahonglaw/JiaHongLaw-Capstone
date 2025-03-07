import './StockList.css';
import StockContext from './contexts/StockContext';
import { useContext, useEffect, useState } from "react";

function StockList() {
    const StockContextValue = useContext(StockContext);
    const [currentPrice, setCurrentPrice] = useState(null);
    let StockSymbol = StockContextValue.stockSymbol;
    let quantity = StockContextValue.quantity;
    let purchasePrice = StockContextValue.purchasePrice

    useEffect(() => {
        if (StockSymbol) { 
            fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${StockSymbol}&apikey=demo`)
                .then(res => res.json())
                .then(data => {
                    if (data["Global Quote"] && data["Global Quote"]["05. price"] ){
                        setCurrentPrice(parseFloat(data["Global Quote"]["05. price"]));
                    } else {
                        console.error("Invalid ticker symbol or no data available");
                        setCurrentPrice(null);

                    }
                    
                })
                .catch(() => setCurrentPrice(null)); 
        }
    }, [StockSymbol]);

    if (!StockSymbol) {
        return <p>No stocks added yet</p>;
    }

    if (currentPrice === null) {
        return <p>Stock price data unavailable.</p>;
    }

    let profitLoss = (currentPrice - purchasePrice) * quantity;

    if (profitLoss > 0) {
        return (
            <div>
                <h2>Stock List</h2>
                <div>
                    <p className="symbol">Symbol: {StockSymbol}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Purchase Price: ${purchasePrice}</p>
                    <p>Current Price: ${currentPrice}</p>
                    <p className="gains">Profit: +${profitLoss}</p>
                    <p className="huat">HUAT ARH!</p>
                </div>
            </div>
        );
    } else if (profitLoss < 0) {
        return (
            <div>
                <h2>Stock List</h2>
                <div>
                    <p className="symbol">Symbol: {StockSymbol}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Purchase Price: ${purchasePrice}</p>
                    <p>Current Price: ${currentPrice}</p>
                    <p className="losses">Loss: -${Math.abs(profitLoss)}</p>
                    <p className="hodl">HODL!</p>
                </div>
            </div>
        );
    }

    // Default case when there's no gain/loss
    return (
        <div>
            <h2>Stock List</h2>
            <div>
                <p className="symbol">Symbol: {StockSymbol}</p>
                <p>Quantity: {quantity}</p>
                <p>Purchase Price: ${purchasePrice}</p>
                <p>Current Price: ${currentPrice}</p>
                <p>No Gain/Loss</p>
            </div>
        </div>
    );
}

export default StockList;
