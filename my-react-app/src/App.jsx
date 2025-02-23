import { useState } from 'react'
import './App.css'

function App() {

  return (

    
    <div className="dashboard-container">
      <h1>Finance Dashboard</h1>

        <form className="stock-form">
        <input type="text" placeholder="Stock Symbol"/><br /><br />
        <input type="number" placeholder="Quantity" /><br /><br />
        <input type="number" placeholder="Purchase Price" /><br /><br />
        <input className="add-stock-btn" type="submit" value="Add Stock" />
        </form>

        
        
        {/* Stock List */}
        <h2>Stock List</h2>
        <p>No stocks added yet.</p>


        </div>
  )
}

export default App
