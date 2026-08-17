// Navbar.jsx
// Simple header showing the app title.

function Navbar() {
    return (
        <div style={styles.navbar}>
            <h1 style={styles.title}>Daffodil Campus Canteen</h1>
        </div>
    );
}

const styles = {
    navbar: {
        backgroundColor: '#2c3e50',
        padding: '15px',
        textAlign: 'center'
    },
    title: {
        color: 'white',
        margin: 0
    }
};

export default Navbar;
