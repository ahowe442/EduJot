const express = require('express');
const port = 5002;
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the EduJot App.' });
});

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//This is where it will get the ideas data
const ideasRouter = require('./routes/ideas');

// Middleware (pass in the endpoint, where you want it to go)
app.use('/api/ideas', ideasRouter);

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
