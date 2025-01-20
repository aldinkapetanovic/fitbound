const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

let isDbConnected = true; // Default to DB being connected
const dbCheckInterval = 60000; // Toggle DB status every 10 minutes

app.use(morgan('combined'));  // You can change the format as needed

// Function to toggle DB connection status periodically
function simulateDbConnection() {
    const dbCheckEnabled = process.env.DB_CONN_CHECK === 'true';

    if (dbCheckEnabled) {
        console.log('Simulating DB connection failures...');

        // Set an interval to simulate a DB connection going up/down every 5 seconds
        setInterval(() => {
            // Toggle DB status between true/false every interval
            isDbConnected = !isDbConnected; // Toggle between connected (true) and disconnected (false)

            console.log(`DB connection status: ${isDbConnected ? 'Connected' : 'Disconnected'}`);
        }, dbCheckInterval);
    } else {
        console.log('DB connection simulation is disabled.');
    }
}

// Simulate the DB connection check periodically
simulateDbConnection();

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Readiness Probe (DB status-based)
app.get('/readiness', (req, res) => {
    if (isDbConnected) {
        return res.status(200).send('DB is connected and app is ready.');
    } else {
        return res.status(500).send('DB is down. App is not ready.');
    }
});

// Liveness Probe (ensures the app is still running)
app.get('/liveness', (req, res) => {
    return res.status(200).send('App is running.');
});

// Listen on the defined port
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
