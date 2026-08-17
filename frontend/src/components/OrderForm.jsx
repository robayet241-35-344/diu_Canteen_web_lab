// OrderForm.jsx
// A controlled form - each input's value lives in useState,
// and every change updates that state.

import { useState } from 'react';
import { foodItems } from './ItemList';

function OrderForm({ onOrderPlaced }) {
    const [customerName, setCustomerName] = useState('');
    const [itemName, setItemName] = useState(foodItems[0].name);
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault(); // stop the page from refreshing

        const selectedItem = foodItems.find((item) => item.name === itemName);
        const totalPrice = selectedItem.price * quantity;

        const newOrder = {
            customer_name: customerName,
            item_name: itemName,
            quantity: quantity,
            total_price: totalPrice
        };

        try {
            // Step 1: send the new order to the backend.
            // "await" means this line pauses here until Express replies -
            // and Express only replies AFTER it has finished inserting
            // the row into MySQL. So by the time we get here, it's saved.
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder)
            });

            if (response.ok) {
                alert('Order placed successfully!');

                // Reset the form
                setCustomerName('');
                setItemName(foodItems[0].name);
                setQuantity(1);

                // Step 2: now that we know the row is really in MySQL,
                // tell the parent (App.jsx) to re-fetch the order list.
                // This is what makes the table "instantly" show the new order.
                onOrderPlaced();
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.log('Error placing order:', error);
            alert('Could not connect to server.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Place Your Order</h2>
            <form onSubmit={handleSubmit}>

                <div style={styles.formGroup}>
                    <label>Student Name / ID: </label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name or ID"
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label>Select Food Item: </label>
                    <select
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        style={styles.input}
                    >
                        {foodItems.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name} (৳{item.price})
                            </option>
                        ))}
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label>Quantity: </label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>
                    Place Order
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        margin: '20px 0',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px'
    },
    formGroup: {
        marginBottom: '12px'
    },
    input: {
        marginLeft: '10px',
        padding: '5px',
        width: '200px'
    },
    button: {
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default OrderForm;
