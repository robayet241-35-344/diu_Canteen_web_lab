// App.jsx
// Main component. Fetches orders from the backend and passes data down
// to the smaller components (Navbar, ItemList, OrderForm, OrderList).

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import './App.css';

function App() {
    // Holds the list of orders coming from MySQL (through Express)
    const [orders, setOrders] = useState([]);

    // Gets the latest orders from the backend
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.log('Error fetching orders:', error);
        }
    };

    // Runs once when the page first loads, so we see existing orders right away
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="App">
            <Navbar />

            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '10px' }}>
                <ItemList />

                {/*
                  This "onOrderPlaced" prop is the key part of the "instant update" flow:
                  1. OrderForm sends the new order to the backend and waits for it to be saved.
                  2. Once saved, OrderForm calls this function (fetchOrders).
                  3. fetchOrders re-reads the orders table from MySQL and updates state.
                  4. React re-renders OrderList with the fresh data automatically.
                  No page refresh needed - it just updates on screen.
                */}
                <OrderForm onOrderPlaced={fetchOrders} />

                <OrderList orders={orders} />
            </div>
        </div>
    );
}

export default App;
