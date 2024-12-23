const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());

const PORT = 3001;

app.get('/', (req,res) => {
    res.send('Wishing you and your family all the best things and timeless treasures this Christmas! Share your endless love and kindness with your nearest and dearest.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});