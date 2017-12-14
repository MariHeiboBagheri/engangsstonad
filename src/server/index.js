const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('*', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
