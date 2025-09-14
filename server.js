const express = require('express');
const cors = require('cors');
const app = express();
const jobsRouter = require('./routes/jobs');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));


app.use('/api/jobs', jobsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
