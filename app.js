const express = require('express');
const app = express();
const port = 3000;

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Liveness check route
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

// Readiness check route
app.get('/readiness', (req, res) => {
    // Simulate readiness logic (e.g., DB check)
    const dbReady = false;
    if (dbReady) {
        res.status(200).send('Ready');
    } else {
        res.status(503).send('Service Unavailable');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
