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
            fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`)
                .then(res => res.json())
                .then(data => {
                    setCurrentPrice(parseFloat(data["Global Quote"]["05. price"]));
                })
                .catch(() => setCurrentPrice(null)); 
        }
    }, [StockSymbol]);

    if (!StockSymbol) {
        return <p>Please enter stock details to view the stock list.</p>;
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
                    <p className="gains">HUAT ARH!</p>
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
                    <p className="losses">HODL</p>
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
                <p className="gains">No Gain/Loss</p>
            </div>
        </div>
    );
}

export default StockList;
