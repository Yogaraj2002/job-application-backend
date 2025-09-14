const express = require('express');
const cors = require('cors');
const app = express();
const jobsRouter = require('./routes/jobs');

app.use(express.json());
app.use(cors({ origin: 'https://job-application-frontend1.onrender.com' }));


app.use('/api/jobs', jobsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
