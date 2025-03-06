import { useState, useContext } from 'react';
import StockContext from './StockContext';

const StockForm = () => {
  const { setStocks, fetchStockData } = useContext(StockContext);
  const [tempStockSymbol, setTempStockSymbol] = useState('');
  const [tempQuantity, setTempQuantity] = useState('');
  const [tempPurchasePrice, setTempPurchasePrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!tempStockSymbol || !tempQuantity || !tempPurchasePrice) return;

    await fetchStockData(tempStockSymbol);

    setStocks((prevStocks) => [
      ...prevStocks,
      {
        stockSymbol: tempStockSymbol.toUpperCase(),
        quantity: Number(tempQuantity),
        purchasePrice: Number(tempPurchasePrice),
      },
    ]);

    setTempStockSymbol('');
    setTempQuantity('');
    setTempPurchasePrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Stock Symbol" value={tempStockSymbol} onChange={(e) => setTempStockSymbol(e.target.value)} required />
      <input type="number" placeholder="Quantity" value={tempQuantity} onChange={(e) => setTempQuantity(e.target.value)} required />
      <input type="number" placeholder="Purchase Price" value={tempPurchasePrice} onChange={(e) => setTempPurchasePrice(e.target.value)} required />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default StockForm;